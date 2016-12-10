import Ember from 'ember';
import Bookmark from 'webmarks/models/bookmark';

export default Ember.Controller.extend({

  queryParams: ['title', 'url'],

  index: Ember.inject.controller(),
  archiveBookmarks: Ember.computed.alias('index.content'),

  bookmarkletUsed: false,

  actions: {
    commit: function() {
      var self = this;

      remoteStorage.bookmarks.archive.store(this.get('serialize')).then(
        function(bookmark) {
          // Remove existing item from collection if exists
          var oldItem = self.archiveBookmarks.findBy('id', bookmark.id);
          if (oldItem) { self.archiveBookmarks.removeObject(oldItem); }

          // Add new item to collection
          var newItem = Bookmark.create(bookmark);
          self.archiveBookmarks.pushObject(newItem);

          self.transitionToRoute('index');
        },
        function(error) {
          alert('Something went wrong.');
          console.log('ERROR:');
          console.log(error);
        }
      );
    },

    cancel: function() {
      this.transitionToRoute('index');
    }
  }

});
