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
        document.getElementById('search-input').focus();
      });
    }
  },

  didInsertElement() {
    this._super(...arguments);
    if (this.autoFocusInput) { this.focusSearchField(); }
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
