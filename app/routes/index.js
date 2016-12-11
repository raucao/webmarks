import Ember from 'ember';

export default Ember.Route.extend({

  storage: Ember.inject.service(),

  redirect: function() {
    if (!this.get('storage.connected')) {
      this.transitionTo('welcome');
    }
  },

  renderTemplate: function() {
    this.render('bookmarks/index');
    // uses bookmarks/index controller
  }

});
