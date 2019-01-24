import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({

  storage: service(),

  redirect: function() {
    if (!this.storage.connected) {
      this.transitionTo('welcome');
    } else {
      this.transitionTo('bookmarks.index');
    }
  }

});
