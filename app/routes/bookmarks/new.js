import Ember from 'ember';
import Bookmark from 'webmarks/models/bookmark';

export default Ember.Route.extend({

  storage: Ember.inject.service(),

  beforeModel: function() {
    if (!this.get('storage.connected')) {
      this.transitionTo('welcome');
    }
  },

  model: function(params) {
    var bookmark = {};
    if (params.title && params.url) {
      bookmark.title = params.title;
      bookmark.url = params.url;
    }
    return Bookmark.create(bookmark);
  },

  setupController: function(controller, bookmark) {
    if (bookmark.title.length > 0) {
      controller.set('bookmarkletUsed', true);
    }
    this._super(controller, bookmark);
  }

});
