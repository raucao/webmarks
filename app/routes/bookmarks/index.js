import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RequireRSConnection from 'webmarks/mixins/require-rs-connection';

export default Route.extend(RequireRSConnection, {

  storage: service(),
  i18n: service(),

  model() {
    return this.storage.getBookmarks();
  }

});
