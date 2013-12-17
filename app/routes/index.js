import Bookmark from 'appkit/models/bookmark';

var IndexRoute = Ember.Route.extend({
  // TODO Initialize objects from here
  // model: function () {
  //   return remoteStorage.bookmarks.archive.getAll();
  // }

  renderTemplate: function() {
    this.render('bookmarks/index');
    // uses bookmarks/index controller
  }

});

export default IndexRoute;
