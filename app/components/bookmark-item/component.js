import Component from '@ember/component';

export default Component.extend({

  tagName: 'li',
  classNames: ['bookmarks'],

  didInsertElement() {
    this._super(...arguments);

    if (this.item.isObservingItem) {
      let domElement = this.$('')[0];
      this.paginationObserver.observe(domElement);
      this.set('paginationItemObserved', domElement);
    }
  },

});
