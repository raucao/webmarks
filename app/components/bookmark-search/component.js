import { scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';

export default Component.extend({

  tagName: 'div',
  classNames: ['search-input'],

  focusSearchField() {
    if (!document.invisible) {
      scheduleOnce('afterRender', () => {
        this.$('input[type=text]')[0].focus();
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
  }

});
