import Ember from 'ember';

export default Ember.Controller.extend({

  application: Ember.inject.controller(),
  model: Ember.computed.alias('application.archiveBookmarks'),

});
