import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import Route from '@ember/routing/route';

export default Route.extend({

  storage: service(),
  i18n: service(),

  queryParams: {
    folder: {
      refreshModel: true
    }
  },

  model (params) {
    if (isEmpty(params.folder)) {
      this.transitionTo('bookmarks.index', { queryParams: { folder: 'archive' } });
    } else {
      return this.storage.getBookmarks(params.folder);
    }
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
