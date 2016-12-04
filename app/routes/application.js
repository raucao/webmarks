import Ember from 'ember';
import Bookmark from 'webmarks/models/bookmark';

export default Ember.Route.extend({

  setupController: function(controller, model) {
    this._super(controller, model);

    var archiveClient = remoteStorage.bookmarks.client.scope('archive/');

    archiveClient.on('change', function(event){
      Ember.run(function() {
        var archiveBookmarks = controller.get('archiveBookmarks');

        if (!event.origin.match(/remote/)) { return; }
        var item;

        // New object coming in from remote
        if (!event.oldValue && event.newValue) {
          item = Bookmark.create(event.newValue);
          archiveBookmarks.pushObject(item);
        }

        // Object deleted on remote
        if (event.oldValue && !event.newValue) {
          item = archiveBookmarks.findProperty('id', event.oldValue.id);
          archiveBookmarks.removeObject(item);
        }

        // Object updated on remote
        if (event.oldValue && event.newValue) {
          item = Bookmark.create(event.newValue);
          var oldItem = archiveBookmarks.findProperty('id', item.id);
          if (oldItem) { archiveBookmarks.removeObject(oldItem); }
          archiveBookmarks.pushObject(item);
        }
      });
    });

  }

});
