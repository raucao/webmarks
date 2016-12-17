import Ember from 'ember';

export default Ember.Route.extend({

  storage: Ember.inject.service(),

  redirect: function() {
    if (!this.get('storage.connected')) {
      this.transitionTo('welcome');
    } else {
      this.transitionTo('bookmarks.index');
    }
  }

});
