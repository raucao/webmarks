import { isEmpty } from '@ember/utils';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  storage: service(),

  filterText: '',

  sortProperties: Object.freeze(['createdAt:desc']),
  sortedBookmarks: sort('model', 'sortProperties'),

  filteredContent: computed('filterText', 'sortedBookmarks', function() {
    var filterText = this.filterText.toLowerCase();
    if (isEmpty(filterText) || filterText.length < 3) {
      return this.sortedBookmarks;
    } else {
      return this.sortedBookmarks.filter(function(item) {
        var match = ( (!isEmpty(item.description) &&
                       item.description.toLowerCase().indexOf(filterText) !== -1) ||
                      item.title.toLowerCase().indexOf(filterText) !== -1 ||
                      item.url.toLowerCase().indexOf(filterText) !== -1 ||
                      (!isEmpty(item.tags) && item.tags.indexOf(filterText) !== -1) );
        return match;
      });
    }
  })

});
