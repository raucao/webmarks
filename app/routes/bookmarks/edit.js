import Ember from 'ember';
import Bookmark from 'webmarks/models/bookmark';
import RequireRSConnection from 'webmarks/mixins/require-rs-connection';

export default Ember.Route.extend(RequireRSConnection, {

  setupController(controller, model) {
    // clone the bookmark for editing so it's only persisted when
    // submitting the form
    this._super(controller, Bookmark.create(model));
  }

});
