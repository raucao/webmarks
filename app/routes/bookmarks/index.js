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

  async beforeModel (transition) {
    if (isEmpty(transition.to.queryParams.folder)) {
      await this.transitionTo('bookmarks.index', { queryParams: { folder: 'archive' } });
    }
  },

  async model (params) {
    await this.storage.loadBookmarks(params.folder);
  },

  setupController (controller, model) {
    this._super(controller, model)
    controller.setInitialPaginationItemCount();
  },

  resetController (controller) {
    if (isEmpty(controller.filterText)) {
      controller.set('showSearchOnSmallScreen', false);
    }
  }

});
