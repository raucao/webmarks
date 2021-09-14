import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { isPresent } from '@ember/utils';
import Bookmark from 'webmarks/models/bookmark';

export default Route.extend({

  storage: service(),
  i18n: service(),

  async model(params) {
    let bookmark = this.storage.findBookmark(params.bookmark_id);

    if (isPresent(bookmark)) {
      return bookmark;
    } else {
      await this.storage.loadAllBookmarks();
      let bookmark = this.storage.findBookmark(params.bookmark_id);

      if (isPresent(bookmark)) {
        return bookmark;
      } else {
        console.warning('No bookmark found for ID', params.bookmark_id);
        this.transitionTo('index');
      }
    }
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
