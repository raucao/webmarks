import Resolver from 'resolver';
import registerComponents from 'appkit/utils/register_components';
import Bookmark from 'appkit/models/bookmark';

var App = Ember.Application.extend({
  // LOG_ACTIVE_GENERATION: true,
  // LOG_MODULE_RESOLVER: true,
  // LOG_TRANSITIONS: true,
  // LOG_TRANSITIONS_INTERNAL: true,
  // LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver,
  archiveBookmarks: [],
  rsConnecting: false,
  rsConnected: false
});

App.initializer({
  name: 'Register Components',
  initialize: function(container, application) {
    registerComponents(container);
  }
});

App.initializer({
  name: "remoteStorage",
  initialize: function(container, application) {
    remoteStorage.access.claim('bookmarks', 'rw');
    remoteStorage.caching.enable('/bookmarks/archive/');
    remoteStorage.displayWidget('remotestorage-connect', { redirectUri: window.location.href });

    remoteStorage.on('ready', function() {
      application.set('rsConnecting', false);
      application.set('rsConnected', true );
    });
    remoteStorage.on('disconnected', function() {
      application.set('rsConnecting', false);
      application.set('rsConnected', false );

      application.set('archiveBookmarks', []);
    });
    remoteStorage.on('connecting', function() {
      application.set('rsConnecting', true);
      application.set('rsConnected', false );
    });
    remoteStorage.on('authing', function() {
      application.set('rsConnecting', true);
      application.set('rsConnected', false );
    });

    var archiveClient = remoteStorage.bookmarks.client.scope('archive/');

    // archiveClient.on('change', function(event){
    //   if (!event.origin.match(/remote|local/)) { return; }
    //   var item;

    //   // New object coming in from remote
    //   if (!event.oldValue && event.newValue) {
    //     item = Bookmark.create(event.newValue);
    //     application.archiveBookmarks.pushObject(item);
    //   }

    //   // Object deleted on remote
    //   if (event.oldValue && !event.newValue) {
    //     item = application.archiveBookmarks.findProperty('id', event.oldValue.id);
    //     application.archiveBookmarks.removeObject(item);
    //   }

    //   //TODO Object updated on remote
    // });
  }
});

export default App;
