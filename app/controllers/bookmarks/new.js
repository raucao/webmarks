import Ember from 'ember';
import Bookmark from 'webmarks/models/bookmark';

export default Ember.Controller.extend({

  queryParams: ['title', 'url'],

  index: Ember.inject.controller(),
  archiveBookmarks: Ember.computed.alias('index.model'),

  bookmarkletUsed: false,

  actions: {
    commit: function() {
      var self = this;

      remoteStorage.bookmarks.archive.store(this.get('model.serialize')).then(
        function(bookmark) {
          // Remove existing item from collection if exists
          var oldItem = self.get('archiveBookmarks').findBy('id', bookmark.id);
          if (oldItem) { self.get('archiveBookmarks').removeObject(oldItem); }

          // Add new item to collection
          var newItem = Bookmark.create(bookmark);
          self.get('archiveBookmarks').pushObject(newItem);

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
