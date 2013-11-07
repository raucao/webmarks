import Bookmark from 'appkit/models/bookmark';

var BookmarksNewController = Ember.ObjectController.extend({

  archiveBookmarksBinding: 'App.archiveBookmarks',

  actions: {
    commit: function() {
      self = this;

      remoteStorage.bookmarks.archive.store(this.get('serialize')).then(
        function(bookmark) {
          // Remove existing item from collection if exists
          var oldItem = self.archiveBookmarks.findProperty('id', bookmark.id);
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
      window.history.back();
    }
  }

});

export default BookmarksNewController;
