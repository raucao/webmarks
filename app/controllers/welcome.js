export default Ember.Controller.extend({

  rsConnectedBinding: 'App.rsConnected',

  handleRsConnect: function() {
    if (this.get('rsConnected')) {
      console.log('rs connected, transition to index');
      this.transitionToRoute('index');
    }
  }.observes('rsConnected')

});
