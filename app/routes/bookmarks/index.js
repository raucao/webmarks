import Ember from 'ember';
import RequireRSConnection from 'webmarks/mixins/require-rs-connection';

export default Ember.Route.extend(RequireRSConnection, {

  storage: Ember.inject.service(),
  i18n: Ember.inject.service(),

  afterModel: function(user) {
    console.log(user);
    // this.set('i18n.locale', user.get('locale'));
  },

  model() {
    return this.get('storage').getBookmarks();
  }

});
