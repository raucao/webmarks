import Ember from 'ember';
import Bookmark from 'webmarks/models/bookmark';
import RequireRSConnection from 'webmarks/mixins/require-rs-connection';

export default Ember.Route.extend(RequireRSConnection, {

  model: function(params) {
    var bookmark = {};
    if (params.title && params.url) {
      bookmark.title = params.title;
      bookmark.url = params.url;
    }
    return Bookmark.create(bookmark);
  },

  setupController: function(controller, bookmark) {
    if (bookmark.title.length > 0) {
      controller.set('bookmarkletUsed', true);
    }

    let tags = ['lgoony', 'lalala'];
    controller.set('availableTags', tags);

    this._super(controller, bookmark);
  },

  resetController: function(controller) {
    let queryParams = controller.get('queryParams');
    queryParams.forEach((param) => {
      controller.set(param, null);
    });
  }

});
