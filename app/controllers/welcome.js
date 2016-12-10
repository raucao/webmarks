import Ember from 'ember';

export default Ember.Controller.extend({

  storage: Ember.inject.service(),

  init: function() {
    this._super(...arguments);

    this.get('storage').on('connected', this.handleStorageConnect.bind(this));
  },

  handleStorageConnect: function() {
    console.log('rs connected, transition to index');
    this.transitionToRoute('index');
  }

});
