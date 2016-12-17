import Ember from 'ember';

export default Ember.Route.extend({

  storage: Ember.inject.service(),

  model() {
    return this.get('storage').getBookmarks();
  }

});
