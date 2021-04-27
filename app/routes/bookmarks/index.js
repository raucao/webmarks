import { inject as service } from '@ember/service';
import { isEmpty, isPresent } from '@ember/utils';
import Route from '@ember/routing/route';

export default Route.extend({

  storage: service(),
  i18n: service(),

  model (params) {
		if (isPresent(params.folder)) {
			console.debug('folder:', params.folder);
		}

    return this.storage.getBookmarks();
  },

  setupController (controller, model) {
    controller.setInitialPaginationItemCount();
    this._super(controller, model)
  },

  resetController (controller) {
    if (isEmpty(controller.filterText)) {
      controller.set('showSearchOnSmallScreen', false);
    }
  }

});
