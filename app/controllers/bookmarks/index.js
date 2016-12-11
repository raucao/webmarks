import Ember from 'ember';

export default Ember.Controller.extend({

  storage: Ember.inject.service(),
  model: Ember.computed.alias('storage.archiveBookmarks'),

  filterText: '',

  sortProperties: ['createdAt:desc'],
  sortedBookmarks: Ember.computed.sort('model', 'sortProperties'),

  filteredContent: function() {
    var filterText = this.get('filterText').toLowerCase();
    if (Ember.isEmpty(filterText) || filterText.length < 3) {
      return this.get('sortedBookmarks');
    } else {
      return this.get('sortedBookmarks').filter(function(item) {
        var match = ( (!Ember.isEmpty(item.description) &&
                       item.description.toLowerCase().indexOf(filterText) !== -1) ||
                      item.title.toLowerCase().indexOf(filterText) !== -1 ||
                      item.url.toLowerCase().indexOf(filterText) !== -1 ||
                      (!Ember.isEmpty(item.tags) && item.tags.indexOf(filterText) !== -1) );
        return match;
      });
    }
  }.property('filterText', 'sortedBookmarks'),

  actions: {
    remove: function(item) {
      this.get('storage').removeBookmark(item.id).catch((error) => {
        alert('Something went wrong.');
        console.log('ERROR:');
        console.log(error);
      });
    }
  }

});
