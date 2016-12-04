import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('welcome', { path: "/welcome" });

  this.resource('bookmarks', function() {
    this.route('new', { queryParams: ['title', 'url'] });
    this.route('edit', { path: 'edit/:bookmark_id' });
  });
});

export default Router;
