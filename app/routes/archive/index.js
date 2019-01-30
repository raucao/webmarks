import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import Route from '@ember/routing/route';
import RequireRSConnection from 'webmarks/mixins/require-rs-connection';

export default Route.extend(RequireRSConnection, {

  storage: service(),
  i18n: service(),

  model () {
    return this.storage.getBookmarks();
  },

  setupController (controller, model) {
    controller.setInitialPaginationItemCount();
    this._super(controller, model)
  },

  resetController: function(controller) {
    if (isEmpty(controller.filterText)) {
      controller.set('showSearchOnSmallScreen', false);
    }
  }

});
