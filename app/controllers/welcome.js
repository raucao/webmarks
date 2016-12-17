import Ember from 'ember';

export default Ember.Controller.extend({

  application: Ember.inject.controller(),
  storage: Ember.inject.service(),

  attemptedTransition: Ember.computed.alias('application.attemptedTransition'),

  init: function() {
    this._super(...arguments);

    this.get('storage').on('connected', this.handleStorageConnect.bind(this));
  },

  handleStorageConnect: function() {
    console.log('rs connected, transition to index');
    if (Ember.isPresent(this.get('attemptedTransition'))) {
      this.get('attemptedTransition').retry();
      this.set('attemptedTransition', null);
    } else {
      this.transitionToRoute('bookmarks.index');
    }
  }

});
