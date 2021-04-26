import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import Bookmark from 'webmarks/models/bookmark';

export default Route.extend({

  storage: service(),
  i18n: service(),

  model(params) {
    return this.storage.getBookmark(params.bookmark_id);
  },

  setupController(controller, model) {
    if (model.tags instanceof Array) {
      model.set('tags', model.tags.join(', '));
    }

    let tags = this.storage.getTagListCache();
    controller.set('availableTags', tags);
    // clone the bookmark for editing so it's only persisted when
    // submitting the form
    this._super(controller, Bookmark.create(model));
  },

  resetController (controller) {
    controller.set('showConfirmation', false);
  }

});
