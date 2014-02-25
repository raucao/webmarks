export default Ember.Controller.extend({

  rsConnectedBinding: 'App.rsConnected',

  handleRsConnectEvents: function() {
    console.log('rs connected: ', this.get('rsConnected'));

    if (this.get('rsConnected')) {
      this.transitionToRoute('index');
    } else {
      this.transitionToRoute('welcome');
    }
  }.observes('rsConnected')

});
