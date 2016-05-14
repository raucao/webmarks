import Bookmark from 'appkit/models/bookmark';

var BookmarksIndexController = Ember.ArrayController.extend({

  needs: ['index'],

  contentBinding: 'controllers.index.content',

  filterText: '',

  sortProperties: ['createdAt'],
  sortAscending: false,

  filteredContent: function() {
    var filterText = this.get('filterText').toLowerCase();
    if (Ember.isEmpty(filterText) || filterText.length < 3) {
      return this.get('arrangedContent');
    } else {
      return this.get('arrangedContent').filter(function(item) {
        var match = ( (!Ember.isEmpty(item.description) &&
                       item.description.toLowerCase().indexOf(filterText) !== -1) ||
                      item.title.toLowerCase().indexOf(filterText) !== -1 ||
                      item.url.toLowerCase().indexOf(filterText) !== -1 ||
                      (!Ember.isEmpty(item.tags) && item.tags.indexOf(filterText) !== -1) );
        return match;
      });
    }
  }.property('filterText', 'content'),

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
