var BookmarksIndexRoute = Ember.Route.extend({
  model: function () {
    return remoteStorage.bookmarks.archive.getAll();
  }
});

export default BookmarksIndexRoute;
