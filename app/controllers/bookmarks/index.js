import Bookmark from 'appkit/models/bookmark';

var BookmarksIndexController = Ember.ArrayController.extend({

  contentBinding: 'App.archiveBookmarks',

  init: function() {
    this._super();
    self = this;

    // remoteStorage.bookmarks.archive.getAll().then(
    //   function(bookmarks) {
    //     bookmarks.forEach(function(bookmark){
    //       var item = Bookmark.create({
    //         id: bookmark.id,
    //         url: bookmark.url,
    //         title: bookmark.title,
    //         description: bookmark.description,
    //         tags: bookmark.tags,
    //         createdAt: bookmark.createdAt
    //       });

    //       self.pushObject(item);
    //     });
    //   }
    // );
  },

  actions: {
    remove: function(item) {
      self = this;
      var bookmark = this.findProperty('id', item.id);

      remoteStorage.bookmarks.archive.remove(item.id).then(
        function() {
          self.removeObject(bookmark);
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

export default BookmarksIndexController;
