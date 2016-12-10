import Ember from 'ember';
import Bookmark from 'webmarks/models/bookmark';

export default Ember.Route.extend({

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
