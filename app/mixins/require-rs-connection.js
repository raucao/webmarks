import Ember from 'ember';

export default Ember.Mixin.create({

  storage: Ember.inject.service(),

  beforeModel: function(transition) {
    this._super(...arguments);

    if (!this.get('storage.connected')) {
      this.controllerFor('application').set('attemptedTransition', transition);
      this.transitionTo('welcome');
    }
  }

});

