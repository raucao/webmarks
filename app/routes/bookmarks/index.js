import Ember from 'ember';
import RequireRSConnection from 'webmarks/mixins/require-rs-connection';

export default Ember.Route.extend(RequireRSConnection, {

  storage: Ember.inject.service(),

  model() {
    return this.get('storage').getBookmarks();
  },

  activate() {
    Ember.run.scheduleOnce('afterRender', this.focusSearchField);
    document.addEventListener("visibilitychange", this.focusSearchField, false);
  },

  deactivate() {
    document.removeEventListener("visibilitychange", this.focusSearchField);
  },

  focusSearchField() {
    if (!document.hidden) {
      Ember.$('.search-input input')[0].focus();
    }
  }

});
