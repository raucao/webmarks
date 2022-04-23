import { isPresent } from '@ember/utils';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller, { inject as controller } from '@ember/controller';

export default Controller.extend({

  application: controller(),
  storage: service(),

  attemptedTransition: alias('application.attemptedTransition'),

  init: function() {
    this._super(...arguments);

    this.storage.on('connected', this.handleStorageConnect.bind(this));
  },

  handleStorageConnect: function() {
    console.log('rs connected, transition to index');
    if (isPresent(this.attemptedTransition)) {
      this.attemptedTransition.retry();
      this.set('attemptedTransition', null);
    } else {
      this.transitionToRoute('bookmarks.index');
    }
  }

});
