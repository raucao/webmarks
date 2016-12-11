import Ember from 'ember';
import Bookmark from 'webmarks/models/bookmark';

export default Ember.Route.extend({

  storage: Ember.inject.service(),

  setupController(controller, model) {
    // clone the bookmark for editing so it's only persisted when
    // submitting the form
    this._super(controller, Bookmark.create(model));
  }

});
