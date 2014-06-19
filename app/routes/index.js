import Bookmark from 'appkit/models/bookmark';

var IndexRoute = Ember.Route.extend({

  model: function(){
    return remoteStorage.bookmarks.archive.getAll().then(
      function(bookmarks) {
        var collection = [];

        bookmarks.forEach(function(bookmark){
          var item = Bookmark.create({
            id: bookmark.id,
            url: bookmark.url,
            title: bookmark.title,
            description: bookmark.description,
            tags: bookmark.tags,
            createdAt: bookmark.createdAt
          });
          collection.push(item);
        });

        return collection;
      }
    );
  },

  setupController: function(controller, model){
    this._super(controller, model);
  },

  redirect: function() {
    if (!remoteStorage.connected) {
      this.transitionTo('welcome');
    }
  },

  renderTemplate: function() {
    this.render('bookmarks/index');
    // uses bookmarks/index controller
  }

});

export default IndexRoute;
