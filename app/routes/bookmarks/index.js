import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import Route from '@ember/routing/route';

export default Route.extend({

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
