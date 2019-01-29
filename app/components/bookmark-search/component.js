import { scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';
import { empty } from '@ember/object/computed';
import { observer } from '@ember/object';

export default Component.extend({

  tagName: 'div',
  classNames: ['search-input'],

  searchToggled: observer('showSearch', function() {
    if (this.showSearch) { this.focusSearchField(); }
  }),

  hideClearButton: empty('filterText'),

  focusSearchField() {
    if (!document.invisible) {
      scheduleOnce('afterRender', () => {
        this.$('#search-input')[0].focus();
      });
    }
  },

  didInsertElement() {
    this._super(...arguments);
    this.focusSearchField();
    this.set('visibilityHandler', this.focusSearchField.bind(this));
    document.addEventListener("visibilitychange", this.visibilityHandler, false);
  },

  willDestroyElement() {
    this._super(...arguments);
    document.removeEventListener("visibilitychange", this.visibilityHandler);
  },

  actions: {

    clearSearchInput() {
      this.set('filterText', '');
      this.$('#search-input')[0].focus();
    }

  }

});
