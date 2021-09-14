import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';

export default Route.extend({

  i18n: service(),
  storage: service(),

  beforeModel () {
    return new Promise(resolve => {
      this.storage.on('connectionStateReady', () => {
        resolve();
      });
    });
  }

});
