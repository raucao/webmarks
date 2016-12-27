import Ember from "ember";

export default Ember.Controller.extend({

  storage: Ember.inject.service(),

  init: function() {
    this._super(...arguments);

    this.get('storage').on('disconnected', this.handleStorageDisconnect.bind(this));
  },

  handleStorageDisconnect: function() {
    localStorage.removeItem('webmarks:tags');
    Ember.Logger.debug('RS disconnected, transition to welcome');
    this.transitionToRoute('welcome');
  }

});
