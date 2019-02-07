import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  i18n: service(),
  storage: service(),
  showSearchOnSmallScreen: false,

  init: function() {
    this._super(...arguments);
    this.storage.on('disconnected', this.handleStorageDisconnect.bind(this));
  },

  handleStorageDisconnect: function() {
    this.transitionToRoute('archive.index');
  },

  showSearchButton: computed('currentRouteName', function() {
    return this.currentRouteName === 'archive.index';
  }),

  currentLocale: computed('i18n.locale', function() {
    return this.i18n.locale.substr(0, 2);
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
