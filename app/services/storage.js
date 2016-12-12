import Ember from 'ember';
import Bookmark from 'webmarks/models/bookmark';

export default Ember.Service.extend(Ember.Evented, {

  connecting: false,
  connected: remoteStorage.connected,
  archiveBookmarks: null,

  init() {
    this._super(...arguments);

    this.set('archiveBookmarks', []);
  },

  fetchBookmarks() {
    return remoteStorage.bookmarks.archive.getAll().then((bookmarks) => {
      bookmarks.forEach((bookmark) => {
        let item = Bookmark.create({
          id: bookmark.id,
          url: bookmark.url,
          title: bookmark.title,
          description: bookmark.description,
          tags: bookmark.tags,
          createdAt: bookmark.createdAt
        });
        this.get('archiveBookmarks').pushObject(item);
      });
    });
  },

  removeBookmark(id) {
    let bookmark = this.get('archiveBookmarks').findBy('id', id);

    return remoteStorage.bookmarks.archive.remove(id).then(() => {
      this.get('archiveBookmarks').removeObject(bookmark);
    });
  },

  storeBookmark(item) {
    return remoteStorage.bookmarks.archive.store(item).then((bookmark) => {
      // Remove existing item from collection if exists
      let oldItem = this.get('archiveBookmarks').findBy('id', bookmark.id);
      if (oldItem) { this.get('archiveBookmarks').removeObject(oldItem); }

      // Add new item to collection
      let newItem = Bookmark.create(bookmark);
      this.get('archiveBookmarks').pushObject(newItem);
    });
  },

  setup() {
    this.setupRemoteStorage();
    this.setupEventHandlers();
  },

  setupRemoteStorage() {
    remoteStorage.access.claim('bookmarks', 'rw');
    remoteStorage.caching.enable('/bookmarks/archive/');
    remoteStorage.displayWidget('remotestorage-connect', { redirectUri: window.location.href });
  },

  setupChangeHandler() {
    remoteStorage.bookmarks.client.scope('archive/').on('change', (event) => {
      Ember.run(() => {
        let archiveBookmarks = this.get('archiveBookmarks');

        if (!event.origin.match(/remote/)) { return; }
        let item;

        // New object coming in from remote
        if (!event.oldValue && event.newValue) {
          item = Bookmark.create(event.newValue);
          let oldItem = archiveBookmarks.findBy('id', item.id);
          if (oldItem) { archiveBookmarks.removeObject(oldItem); }
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
    remoteStorage.on('ready', () => {
      console.log('rs.on ready');
    });

    remoteStorage.on('connected', () => {
      console.log('rs.on connected');
      this.set('connecting', false);
      this.set('connected', true);
      this.fetchBookmarks().then(() => {
        this.setupChangeHandler();
      });
      this.trigger('connected');
    });

    remoteStorage.on('not-connected', () => {
      console.log('rs.on not-connected');
      this.set('connecting', false);
      this.set('connected', false);
    });

    remoteStorage.on('disconnected', () => {
      console.log('rs.on disconnected');
      this.set('connecting', false);
      this.set('connected', false);

      this.trigger('disconnected');

      this.set('archiveBookmarks', []);
    });

    remoteStorage.on('connecting', () => {
      console.log('rs.on connecting');
      this.set('connecting', true);
      this.set('connected', false);
    });

    remoteStorage.on('authing', () => {
      console.log('rs.on authing');
      this.set('connecting', true);
      this.set('connected', false);
    });
  }

});

