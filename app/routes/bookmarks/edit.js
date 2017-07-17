import Ember from 'ember';
import Bookmark from 'webmarks/models/bookmark';
import RequireRSConnection from 'webmarks/mixins/require-rs-connection';

export default Ember.Route.extend(RequireRSConnection, {

  storage: Ember.inject.service(),
  i18n: Ember.inject.service(),

  model(params) {
    return this.get('storage').getBookmark(params.bookmark_id);
  },

  setupController(controller, model) {
    let tags = this.get('storage').getTagListCache();
    controller.set('availableTags', tags);
    // clone the bookmark for editing so it's only persisted when
    // submitting the form
    this._super(controller, Bookmark.create(model));
  }

});
