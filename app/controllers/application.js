import Ember from "ember";

export default Ember.Controller.extend({

  rsConnected: Ember.computed.alias('App.rsConnected'),
  archiveBookmarks: [],

  handleRsDisconnect: function() {
    if (!this.get('rsConnected')) {
      console.log('rs disconnected, transition to welcome');
      this.transitionToRoute('welcome');
    }
  }.observes('rsConnected')

});
