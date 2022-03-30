import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({

  tagName: 'li',
  classNames: ['bookmarks'],

  storage: service(),

  didInsertElement() {
    this._super(...arguments);

    if (this.item.isObservingItem) {
      let domElement = this.$('')[0];
      this.paginationObserver.observe(domElement);
      this.set('paginationItemObserved', domElement);
    }
  },

  actions: {

    markAsRead () {
      this.item.markAsRead = true;

      this.storage.archiveBookmark(this.item).then(() => {
        // TODO Show some success indicator
      });
    }

  }

});
