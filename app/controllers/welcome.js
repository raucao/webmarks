import Ember from 'ember';

export default Ember.Controller.extend({

  rsConnected: Ember.computed.alias('App.rsConnected'),

  handleRsConnect: function() {
    if (this.get('rsConnected')) {
      console.log('rs connected, transition to index');
      this.transitionToRoute('index');
    }
  }.observes('rsConnected')

});
