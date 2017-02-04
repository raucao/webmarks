import Ember from 'ember';
import RequireRSConnection from 'webmarks/mixins/require-rs-connection';

export default Ember.Route.extend(RequireRSConnection, {

  storage: Ember.inject.service(),

  model() {
    return this.get('storage').getBookmarks();
  }

});
