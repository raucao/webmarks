import Bookmark from 'appkit/models/bookmark';

var BookmarksNewRoute = Ember.Route.extend({

  setupController: function(controller, context, queryParams) {
    var bookmark = {};
    if (queryParams.title && queryParams.url) {
      bookmark.title = queryParams.title;
      bookmark.url = queryParams.url;
      controller.set('bookmarkletUsed', true);
    }
    controller.set('content', Bookmark.create(bookmark));
  }

});

export default BookmarksNewRoute;
