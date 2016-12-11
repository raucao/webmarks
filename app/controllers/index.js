import Ember from 'ember';

export default Ember.Controller.extend({

  storage: Ember.inject.service(),
  model: Ember.computed.alias('storage.archiveBookmarks'),

});
