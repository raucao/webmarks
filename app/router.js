var Router = Ember.Router.extend();

Router.map(function() {
  this.route('component-test');
  this.route('helper-test');

  this.resource('bookmarks', { path: '/bookmarks' }, function() {
    this.route('new', { queryParams: ['title', 'url'] });
    this.route('edit', { path: 'edit/:bookmark_id' });
  });
  this.route('import', { path: "/import" });
});

Router.reopen({
  location: 'history'
});

export default Router;
