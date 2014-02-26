export default Ember.Route.extend({

  beforeModel: function() {
    if (remoteStorage.connected) {
      console.log('ohai');
      this.transitionTo('index');
    }
  }

});
