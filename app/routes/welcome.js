import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({

  i18n: service(),
  storage: service(),

  beforeModel: function() {
    if (this.get('storage.connected')) {
      console.log('ohai');
      this.transitionTo('index');
    }
  }

});
