export default Ember.Controller.extend({

  rsConnectedBinding: 'App.rsConnected',

  handleRsDisconnect: function() {
    if (!this.get('rsConnected')) {
      console.log('rs disconnected, transition to welcome');
      this.transitionToRoute('welcome');
    }
  }.observes('rsConnected')

});
