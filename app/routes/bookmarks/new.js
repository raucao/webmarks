import Bookmark from 'appkit/models/bookmark';

var BookmarksNewRoute = Ember.Route.extend({

  // model: function(params, transition, queryParams) {
  //   console.log('PARAMS', queryParams);
    // return Bookmark.create();
  // },

  setupController: function(controller, context, queryParams) {
    var bookmark = {};
    console.log('PARAMS', queryParams);
    // if (queryParams && queryParams.title && queryParams.url) {
    //   bookmark.title = queryParams.title;
    //   bookmark.url = queryParams.url;
    //   controller.set('bookmarkletUsed', true);
    // }
    controller.set('content', Bookmark.create(bookmark));
  }

});

export default BookmarksNewRoute;
