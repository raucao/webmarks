export default Ember.ObjectController.extend({

  rsConnectedBinding: 'App.rsConnected',
  archiveBookmarks: [],

  handleRsDisconnect: function() {
    if (!this.get('rsConnected')) {
      console.log('rs disconnected, transition to welcome');
      this.transitionToRoute('welcome');
    }
  }.observes('rsConnected')

});
