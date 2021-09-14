import { Promise } from 'rsvp';
import Service from '@ember/service';
import Evented from '@ember/object/evented';
import { run } from '@ember/runloop';
import { isEmpty, isPresent } from '@ember/utils';
import { A } from '@ember/array';
import config from 'webmarks/config/environment';
import Bookmark from 'webmarks/models/bookmark';
import RemoteStorage from 'remotestoragejs';
import Widget from 'remotestorage-widget';
import Bookmarks from 'remotestorage-module-bookmarks';

export default Service.extend(Evented, {

  remoteStorage: null,
  widget: null,
  connecting: true,
  connected: false,
  bookmarksLoaded: null,
  tags: null,

  init() {
    this._super(...arguments);

    this.set('bookmarksLoaded', A([]));

    if (config.environment !== 'test') {
      this.setupRemoteStorage();
      this.setupConnectWidget();
      this.setupEventHandlers();
      this.setupRemoteChangeHandler();
    }
  },

  /**
   * Find a bookmark in any folder by ID
   */
  findBookmark (id) {
    return this.bookmarksLoaded.findBy('id', id);
  },

  /**
   * Fetches bookmarks from storage
   *
   * @protected
   */
  async fetchBookmarks(folderName='archive') {
    const folder = this.remoteStorage.bookmarks.openFolder(folderName);

    // TODO add sync error handling
    return folder.getAll(false);
  },

  /**
   * Load bookmarks into bookmarksLoaded collection as model instances
   */
  async loadBookmarks(folderName) {
    console.debug('Loading bookmarks in folder', folderName);
    let bookmarks = this.bookmarksLoaded.filterBy('folderName', folderName);
    if (isPresent(bookmarks)) return bookmarks;

    return this.fetchBookmarks(folderName).then(bookmarks => {
      bookmarks.forEach(bookmark => {
        if (isEmpty(bookmark.title) || isEmpty(bookmark.url)) {
          console.warn('Encountered an invalid bookmark object', bookmark);
          return;
        }

        const item = Bookmark.create({
          id: bookmark.id,
          url: bookmark.url,
          title: bookmark.title,
          description: bookmark.description,
          tags: bookmark.tags,
          createdAt: bookmark.createdAt,
          folderName: folderName
        });

        if (typeof bookmark.unread !== 'undefined') {
          item.unread = bookmark.unread;
        }

        const oldItem = this.bookmarksLoaded.findBy('id', item.id);
        if (oldItem) {
          this.bookmarksLoaded.removeObject(oldItem);
        }

        this.bookmarksLoaded.pushObject(item);
      });

      if (bookmarks.length !== 0) { this.createTagListCache(); }

      return this.bookmarksLoaded.filterBy('folderName', folderName);
    });
  },

  /**
   * Load bookmarks from all folders into bookmarksLoaded collections
   */
  async loadAllBookmarks () {
    // TODO look up folder names
    await this.loadBookmarks('archive');
    await this.loadBookmarks('readlater');
    return;
  },

  /**
   * Remove a bookmark from persistent storage and loaded collection
   */
  removeBookmark(bookmark) {
    const folder = this.remoteStorage.bookmarks.openFolder(bookmark.folderName);

    return folder.remove(bookmark.id).then(() => {
      console.debug('Deleted bookmark from storage:', bookmark.id);
      const item = this.bookmarksLoaded.findBy('id', bookmark.id);
      this.bookmarksLoaded.removeObject(item);
    });
  },

  storeBookmark(item) {
    const oldId = item.urlChanged ? item.id : null;

    let folder;
    if (item.saveForLater || item.unread) {
      item.unread = true;
      folder = this.remoteStorage.bookmarks.openFolder('readlater');
    } else {
      folder = this.remoteStorage.bookmarks.openFolder('archive');
    }

    return folder.store(item.serialize)
      .then(bookmark => {
        // Remove existing item from collection if exists
        const oldItem = this.bookmarksLoaded.findBy('id', bookmark.id) ||
                        this.bookmarksLoaded.findBy('id', oldId);
        if (oldItem) { this.bookmarksLoaded.removeObject(oldItem); }

        // Add new item to collection
        const newItem = Bookmark.create(bookmark);
        newItem.set('folderName', folder.name);
        this.bookmarksLoaded.pushObject(newItem);

        // If the URL (and thus ID) was changed, delete the old document
        return oldId ? folder.remove(oldId) : Promise.resolve();
      })
  },

  setupRemoteStorage() {
    const remoteStorage = new RemoteStorage({modules: [Bookmarks]});
    this.set('remoteStorage', remoteStorage);

    this.remoteStorage.access.claim('bookmarks', 'rw');
    this.remoteStorage.caching.enable('/bookmarks/');

    // this.remoteStorage.setApiKeys({
    //   dropbox: config.dropboxAppKey,
    //   googledrive: config.gdriveClientId
    // });
  },

  setupConnectWidget() {
    const widget = new Widget(this.remoteStorage, {
      domID: 'remotestorage-connect',
      redirectUri: window.location.href,
      modalBackdrop: true
    });

    // Attach widget to DOM
    widget.attach();

    this.set('widget', widget);
  },

  setupRemoteChangeHandler() {
    this.remoteStorage.bookmarks.client.scope('').on('change', (event) => {
      run(() => {
        console.log(`${event.origin} change for ${event.path}`);
        if (!event.origin.match(/remote/)) { return; }

        const folderName = event.path.match('/bookmarks/(.+)/')[1];
        let item;

        // New object coming in from remote
        if (!event.oldValue && event.newValue) {
          item = Bookmark.create(event.newValue);
          item.folderName = folderName;
          const oldItem = this.bookmarksLoaded.findBy('id', item.id);
          if (oldItem) {
            console.warn('Received change event for a new item that was already cached', oldItem, event);
            this.bookmarksLoaded.removeObject(oldItem);
          }
          this.bookmarksLoaded.pushObject(item);
        }

        // Object deleted on remote
        if (event.oldValue && !event.newValue) {
          item = this.bookmarksLoaded.findBy('id', event.oldValue.id);
          this.bookmarksLoaded.removeObject(item);
        }

        // Object updated on remote
        if (event.oldValue && event.newValue) {
          item = Bookmark.create(event.newValue);
          item.folderName = folderName;
          const oldItem = this.bookmarksLoaded.findBy('id', item.id);
          if (oldItem) { this.bookmarksLoaded.removeObject(oldItem); }
          this.bookmarksLoaded.pushObject(item);
        }
      });
    });
  },

  setupEventHandlers() {
    console.debug('Setting up RS event handlers');

    this.remoteStorage.on('ready', () => {
      console.debug('rs.on ready');
      // this.set('connecting', false);
    });

    this.remoteStorage.on('connected', () => {
      console.debug('rs.on connected');
      this.set('connecting', false);
      this.set('connected', true);
      this.trigger('connected');
      this.trigger('connectionStateReady');
    });

    this.remoteStorage.on('not-connected', () => {
      console.debug('rs.on not-connected');
      this.set('connecting', false);
      this.set('connected', false);
      this.trigger('not-connected');
      this.trigger('connectionStateReady');
    });

    this.remoteStorage.on('disconnected', () => {
      console.debug('rs.on disconnected');
      this.set('connecting', false);
      this.set('connected', false);

      this.trigger('disconnected');

      this.set('bookmarksLoaded', A([]));
      this.deleteTagListCache();
    });

    this.remoteStorage.on('connecting', () => {
      console.debug('rs.on connecting');
      this.set('connecting', true);
      this.set('connected', false);
    });

    this.remoteStorage.on('authing', () => {
      console.debug('rs.on authing');
      this.set('connecting', true);
      this.set('connected', false);
    });
  },

  createTagListCache() {
    const tagList = this.bookmarksLoaded.mapBy('tags')
                                        .compact()
                                        .reduce((a, b) => a.concat(b), [''])
                                        .reject((a) => isEmpty(a))
                                        .uniq()
                                        .sort();

    console.debug('[storage] Writing tag list to localStorage', JSON.stringify(tagList));

    try {
      localStorage.setItem('webmarks:tags', tagList);
    }
    catch(e) {
      console.warn('[storage] Error writing tag list to localStorage', e);
    }
  },

  getTagListCache() {
    const tagList = localStorage.getItem('webmarks:tags');

    if (isPresent(tagList)) {
      return tagList.split(',');
    } else {
      console.warn('[storage] Tag list from cache was empty');
      return [];
    }
  },

  deleteTagListCache() {
    try {
      return localStorage.removeItem('webmarks:tags');
    }
    catch(e) {
      console.warn('[storage] Error deleting tag list from localStorage', e);
      return false;
    }
  }

  // TODO
  // addToTagListCache() {
  //
  // }

});
