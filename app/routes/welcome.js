import Ember from 'ember';

export default Ember.Route.extend({

  i18n: Ember.inject.service(),

  beforeModel: function() {
    if (remoteStorage.connected) {
      console.log('ohai');
      this.transitionTo('index');
    }
  }

});
