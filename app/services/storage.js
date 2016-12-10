import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {

  connecting: false,
  connected: remoteStorage.connected,
  archiveBookmarks: null,

  init: function() {
    this._super(...arguments);

    this.set('archiveBookmarks', []);
  },

  setup: function() {
    this.setupRemoteStorage();
    this.setupEventHandlers();
  },

  setupRemoteStorage: function() {
    remoteStorage.access.claim('bookmarks', 'rw');
    remoteStorage.caching.enable('/bookmarks/archive/');
    remoteStorage.displayWidget('remotestorage-connect', { redirectUri: window.location.href });
  },

  setupEventHandlers: function() {
    remoteStorage.on('ready', () => {
      console.log('rs.on ready');
    });

    remoteStorage.on('connected', () => {
      console.log('rs.on connected');
      this.set('connecting', false);
      this.set('connected', true);
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

