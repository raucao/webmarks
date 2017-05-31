import Ember from 'ember';
import Bookmark from 'webmarks/models/bookmark';
import RemoteStorage from 'npm:remotestoragejs';
import Widget from 'npm:remotestorage-widget';
import Bookmarks from 'npm:remotestorage-module-bookmarks';

const {
  RSVP: { Promise },
  Service,
  Evented,
  computed,
  Logger,
  run,
  isPresent
} = Ember;

export default Service.extend(Evented, {

  remoteStorage: null,
  connecting: true,
  connected: computed.alias('remoteStorage.connected'),
  archiveBookmarks: null,
  bookmarksLoaded: false,
  tags: null,

  init() {
    this._super(...arguments);

    this.set('archiveBookmarks', []);

    this.setupRemoteStorage();
    this.setupEventHandlers();
  },

  getBookmarks() {
    return new Promise((resolve, reject) => {
      if (this.get('bookmarksLoaded')) {
        resolve(this.get('archiveBookmarks'));
      } else {
        this.loadBookmarks().then((bookmarks) => {
          resolve(bookmarks);
        }).catch(reject);
      }
    });
  },

  getBookmark(id) {
    return new Promise((resolve, reject) => {
      if (this.get('bookmarksLoaded')) {
        resolve(this.get('archiveBookmarks').findBy('id', id));
      } else {
        this.loadBookmarks().then((bookmarks) => {
          resolve(bookmarks.findBy('id', id));
        }).catch(reject);
      }
    });
  },

  /**
   * Fetches bookmarks from storage
   *
   * @protected
   */
  fetchBookmarks() {
    let archive = this.get('remoteStorage').bookmarks.archive;

    return new Promise((resolve/*, reject */) => {
      archive.getAll().then(resolve);

      // TODO implement options for getAll in bookmarks module so we can set maxAge to false
      // setTimeout(() => {
      //   Logger.debug('Timed out (10s) fetching bookmarks from remote, using local cache');
      //   archive.getAll({maxAge: false}).then(resolve));
      //   // TODO if nothing in local cache, communicate to the user what happened
      // }, 10000);
    });
  },

  /**
   * Load all bookmarks into archiveBookmarks collection as model instances
   *
   * @protected
   */
  loadBookmarks() {
    return this.fetchBookmarks().then((bookmarks) => {
      let archiveBookmarks = this.get('archiveBookmarks');

      bookmarks.forEach((bookmark) => {
        let item = Bookmark.create({
          id: bookmark.id,
          url: bookmark.url,
          title: bookmark.title,
          description: bookmark.description,
          tags: bookmark.tags,
          createdAt: bookmark.createdAt
        });

        let oldItem = archiveBookmarks.findBy('id', item.id);
        if (oldItem) {
          archiveBookmarks.removeObject(oldItem);
        }

        archiveBookmarks.pushObject(item);
      });
      this.set('bookmarksLoaded', true);
      this.createTagListCache();
      this.setupChangeHandler();

      return archiveBookmarks;
    });
  },

  removeBookmark(id) {
    let bookmark = this.get('archiveBookmarks').findBy('id', id);

    return this.get('remoteStorage').bookmarks.archive.remove(id).then(() => {
      this.get('archiveBookmarks').removeObject(bookmark);
    });
  },

  storeBookmark(item) {
    return this.get('remoteStorage').bookmarks.archive.store(item).then((bookmark) => {
      // Remove existing item from collection if exists
      let oldItem = this.get('archiveBookmarks').findBy('id', bookmark.id);
      if (oldItem) { this.get('archiveBookmarks').removeObject(oldItem); }

      // Add new item to collection
      let newItem = Bookmark.create(bookmark);
      this.get('archiveBookmarks').pushObject(newItem);
    });
  },

  setupRemoteStorage() {
    let remoteStorage = new RemoteStorage({modules: [Bookmarks.default]});
    this.set('remoteStorage', remoteStorage);

    remoteStorage.access.claim('bookmarks', 'rw');
    remoteStorage.caching.enable('/bookmarks/archive/');

    new Widget(remoteStorage, {
      domID: 'remotestorage-connect',
      redirectUri: window.location.href
    });
  },

  setupChangeHandler() {
    this.get('remoteStorage').bookmarks.client.scope('archive/').on('change', (event) => {
      run(() => {
        let archiveBookmarks = this.get('archiveBookmarks');

        if (!event.origin.match(/remote/)) { return; }
        let item;

        // New object coming in from remote
        if (!event.oldValue && event.newValue) {
          item = Bookmark.create(event.newValue);
          let oldItem = archiveBookmarks.findBy('id', item.id);
          if (oldItem) {
            Logger.warn('Received change event for a new item that was already cached', oldItem, event);
            archiveBookmarks.removeObject(oldItem);
          }
          archiveBookmarks.pushObject(item);
        }

        // Object deleted on remote
        if (event.oldValue && !event.newValue) {
          item = archiveBookmarks.findBy('id', event.oldValue.id);
          archiveBookmarks.removeObject(item);
        }

        // Object updated on remote
        if (event.oldValue && event.newValue) {
          item = Bookmark.create(event.newValue);
          let oldItem = archiveBookmarks.findBy('id', item.id);
          if (oldItem) { archiveBookmarks.removeObject(oldItem); }
          archiveBookmarks.pushObject(item);
        }
      });
    });
  },

  setupEventHandlers() {
    let rs = this.get('remoteStorage');

    rs.on('ready', () => {
      Logger.debug('rs.on ready');
      // this.set('connecting', false);
    });

    rs.on('connected', () => {
      Logger.debug('rs.on connected');
      this.set('connecting', false);
      this.set('connected', true);
      this.trigger('connected');
    });

    rs.on('not-connected', () => {
      Logger.debug('rs.on not-connected');
      this.set('connecting', false);
      this.set('connected', false);
    });

    rs.on('disconnected', () => {
      Logger.debug('rs.on disconnected');
      this.set('connecting', false);
      this.set('connected', false);

      this.trigger('disconnected');

      this.set('archiveBookmarks', []);
    });

    rs.on('connecting', () => {
      Logger.debug('rs.on connecting');
      this.set('connecting', true);
      this.set('connected', false);
    });

    rs.on('authing', () => {
      Logger.debug('rs.on authing');
      this.set('connecting', true);
      this.set('connected', false);
    });
  },

  createTagListCache() {
    let tagList = this.get('archiveBookmarks')
                      .mapBy('tags')
                      .compact()
                      .reduce((a, b) => a.concat(b), [""])
                      .reject((a) => Ember.isEmpty(a))
                      .uniq()
                      .sort();

    Logger.debug('[storage] Writing tag list to localStorage', JSON.stringify(tagList));

    try {
      localStorage.setItem('webmarks:tags', tagList);
    }
    catch(e) {
      Logger.warn('[storage] Error writing tag list to localStorage', e);
    }
  },

  getTagListCache() {
    let tagList = localStorage.getItem('webmarks:tags');

    if (isPresent(tagList)) {
      return tagList.split(',');
    } else {
      Logger.warn('[storage] Tag list from cache was empty');
      return [];
    }
  },

  deleteTagListCache() {
    try {
      return localStorage.removeItem('webmarks:tags');
    }
    catch(e) {
      Logger.warn('[storage] Error deleting tag list from localStorage', e);
      return false;
    }
  }

  // TODO
  // addToTagListCache() {
  //
  // }

});

