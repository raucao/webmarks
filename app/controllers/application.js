import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  storage: service(),
  showSearchOnSmallScreen: false,

  init: function() {
    this._super(...arguments);

    this.storage.on('disconnected', this.handleStorageDisconnect.bind(this));
  },

  handleStorageDisconnect: function() {
    this.storage.deleteTagListCache();

    console.debug('RS disconnected, transition to welcome');
    this.transitionToRoute('welcome');
  },

  showSearchButton: computed('currentRouteName', function() {
    return this.currentRouteName === 'archive.index';
  }),

  isLargeScreen: computed(function() {
    return window.innerWidth > 420;
  }).volatile(),

  actions: {

    toggleSearch () {
      this.toggleProperty('showSearchOnSmallScreen')
    }

  }

});
