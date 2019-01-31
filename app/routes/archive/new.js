import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import Bookmark from 'webmarks/models/bookmark';

export default Route.extend({

  storage: service(),
  i18n: service(),

  model (params) {
    var bookmark = { isNew: true };
    if (params.title && params.url) {
      bookmark.title = params.title;
      bookmark.url = params.url;
    }
    return Bookmark.create(bookmark);
  },

  setupController (controller, bookmark) {
    if (bookmark.title.length > 0) {
      controller.set('bookmarkletUsed', true);
    }

    let tags = this.storage.getTagListCache();
    controller.set('availableTags', tags);

    this._super(controller, bookmark);
  },

  resetController (controller) {
    let queryParams = controller.queryParams;
    queryParams.forEach(param => controller.set(param, null));
    controller.set('showConfirmation', false);
  }

});
