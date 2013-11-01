import Bookmark from 'appkit/models/bookmark';

var BookmarksNewController = Ember.ObjectController.extend({

  archiveBookmarksBinding: 'App.archiveBookmarks',

  actions: {
    commit: function() {
      self = this;

      remoteStorage.bookmarks.archive.store(this.get('serialize')).then(
        function(bookmark) {
          var item = Bookmark.create({
            id: bookmark.id,
            url: bookmark.url,
            title: bookmark.title,
            description: bookmark.description,
            tags: bookmark.tags,
            createdAt: bookmark.createdAt
          });
          self.archiveBookmarks.pushObject(item);

          self.transitionToRoute('index');
        },
        function(error) {
          alert('Something went wrong.');
          console.log('ERROR:');
          console.log(error);
        }
      );
    }
  }

});

export default BookmarksNewController;
