import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

export default Mixin.create({

  storage: service(),

  beforeModel: function(transition) {
    this._super(...arguments);

    if (!this.storage.connected) {
      this.controllerFor('application').set('attemptedTransition', transition);
      this.transitionTo('welcome');
    }
  }

});

