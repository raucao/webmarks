import Ember from "ember";

export default Ember.Controller.extend({

  storage: Ember.inject.service(),
  archiveBookmarks: [],

  init: function() {
    this._super(...arguments);

    this.get('storage').on('disconnected', this.handleStorageDisconnect.bind(this));
  },

  handleStorageDisconnect: function() {
    console.log('rs disconnected, transition to welcome');
    this.transitionToRoute('welcome');
  }

});
