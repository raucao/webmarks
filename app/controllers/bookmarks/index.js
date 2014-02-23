import Bookmark from 'appkit/models/bookmark';

var BookmarksIndexController = Ember.ArrayController.extend({

  contentBinding: 'App.archiveBookmarks',

  filterText: '',

  sortProperties: ['createdAt'],
  sortAscending: false,

  init: function() {
    // TODO move to route
    this._super();
    self = this;

    remoteStorage.bookmarks.archive.getAll().then(
      function(bookmarks) {
        bookmarks.forEach(function(bookmark){
          var item = Bookmark.create({
            id: bookmark.id,
            url: bookmark.url,
            title: bookmark.title,
            description: bookmark.description,
            tags: bookmark.tags,
            createdAt: bookmark.createdAt
          });

          var existingItem = self.findProperty('id', bookmark.id);
          if (!existingItem) { self.pushObject(item); }
        });
      }
    );
  },

  filteredContent: function() {
    var filterText = this.get('filterText').toLowerCase();
    if (Ember.isEmpty(filterText) || filterText.length < 3) {
      return this.get('arrangedContent');
    } else {
      return this.get('arrangedContent').filter(function(item) {
        var match = ( item.description.toLowerCase().indexOf(filterText) !== -1 ||
                      item.title.toLowerCase().indexOf(filterText) !== -1 ||
                      item.url.toLowerCase().indexOf(filterText) !== -1 ||
                      item.tags.indexOf(filterText) !== -1 );
        return match;
      });
    }
  }.property('filterText'),

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
