import { isEmpty } from '@ember/utils';
import { alias, and, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller, { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { isPresent } from '@ember/utils';

export default Controller.extend({

  storage: service(),
  application: controller(),

  queryParams: ['tags', 'folder'],
  tags: null,
  folder: null,

  filterText: '',
  showSearchOnSmallScreen: alias('application.showSearchOnSmallScreen'),
  isLargeScreen: alias('application.isLargeScreen'),

  paginationItemsPerPage: 30,
  paginationItemsToLoad: 0,
  paginationItemObserved: null,

  bookmarks: computed('folder', 'storage.bookmarksLoaded.[]', function() {
    return this.storage.bookmarksLoaded.filterBy('folderName', this.folder);
  }),

  sortProperties: Object.freeze(['createdAt:desc']),
  sortedBookmarks: sort('bookmarks', 'sortProperties'),

  showSyncProgress: and('storage.syncInProgress', 'storage.syncIsLarge'),

  init() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, 'createIntersectionObserver');
    // this.storage.on('disconnected', this.handleStorageDisconnect.bind(this));
  },

  // handleStorageDisconnect: function() {
  //   this.set('model', []);
  // },

  filteredContent: computed('filterText', 'sortedBookmarks', function() {
    this.setInitialPaginationItemCount();
    let filterText = this.filterText.toLowerCase();

    if (isEmpty(filterText) || filterText.length < 3) {
      return this.sortedBookmarks;
    } else {
      return this.sortedBookmarks.filter(function(item) {
        let match = ( (!isEmpty(item.description) &&
                       item.description.toLowerCase().indexOf(filterText) !== -1) ||
                      item.title.toLowerCase().indexOf(filterText) !== -1 ||
                      item.url.toLowerCase().indexOf(filterText) !== -1 ||
                      (!isEmpty(item.tags) && item.tags.indexOf(filterText) !== -1) );
        return match;
      });
    }
  }),

  paginationActive: computed('paginationItemsPerPage.[]', 'filteredContent', function() {
    return this.filteredContent.length > this.paginationItemsPerPage;
  }),

  paginatedContent: computed('filteredContent', 'paginationItemsToLoad', function() {
    let items = this.filteredContent.slice(0, this.paginationItemsToLoad);

    if (isPresent(this.paginationItemObserved)) {
      this.paginationObserver.unobserve(this.paginationItemObserved);
    }
    items.lastObject.set('isObservingItem', true);

    return items;
  }),

  setInitialPaginationItemCount () {
    this.set('paginationItemsToLoad', this.paginationItemsPerPage);
  },

  createIntersectionObserver () {
    const config = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    };

    let observer = new IntersectionObserver((entries, self) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // render more items
          let newItemCount = this.paginatedContent.length + this.paginationItemsPerPage;
          this.set('paginationItemsToLoad', newItemCount);
          self.unobserve(entry.target);
        }
      });
    }, config);

    this.set('paginationObserver', observer);
  }

});
