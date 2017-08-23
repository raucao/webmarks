import Ember from 'ember';

export default Ember.Route.extend({

  storage: Ember.inject.service(),

  beforeModel: function() {
    if (this.get('storage.connected')) {
      console.log('ohai');
      this.transitionTo('index');
    }
  }

});
