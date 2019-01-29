import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('welcome', { path: "/welcome" });

  this.route('archive', function() {
    this.route('new', { queryParams: ['title', 'url'] });
    this.route('edit', { path: 'edit/:bookmark_id' });
    this.route('index', { path: '', queryParams: ['tags'] });
  });

  this.route('bookmarks', function() {
    this.route('new', { queryParams: ['title', 'url'] });
  });
});

export default Router;
