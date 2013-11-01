var IndexRoute = Ember.Route.extend({
  model: function () {
    return remoteStorage.bookmarks.archive.getAll();
  },

  renderTemplate: function() {
    this.render('bookmarks/index');
  }
});

export default IndexRoute;
