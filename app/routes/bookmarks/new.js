import Bookmark from 'appkit/models/bookmark';

var BookmarksNewRoute = Ember.Route.extend({

  model: function() {
    return Bookmark.create();
  }

});

export default BookmarksNewRoute;
