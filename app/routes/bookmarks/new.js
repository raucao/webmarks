import Bookmark from 'appkit/models/bookmark';

var BookmarksNewRoute = Ember.Route.extend({

  beforeModel: function() {
    if (!remoteStorage.connected) {
      this.transitionTo('welcome');
    }
  },

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
    this._super(controller, bookmark);
  }

});

export default BookmarksNewRoute;
