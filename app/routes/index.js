var IndexRoute = Ember.Route.extend({

  renderTemplate: function() {
    this.render('bookmarks/index');
    // uses bookmarks/index controller
  }

});

export default IndexRoute;
