import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('welcome');

  this.route('bookmarks', function() {
    this.route('new', { queryParams: [ 'title', 'url', 'description' ] });
    this.route('edit', { path: 'edit/:bookmark_id' });
    this.route('index', { path: '', queryParams: ['tags', 'folder'] });
  });

  this.route('archive', function() {
    this.route('new', { queryParams: ['title', 'url'] });
  });
  this.route('privacy');
  this.route('about');
});
