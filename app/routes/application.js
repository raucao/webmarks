export default Ember.Route.extend({

  activate: function() {
    if (remoteStorage.connected) {
      this.transitionTo('index');
    }
  }

});
