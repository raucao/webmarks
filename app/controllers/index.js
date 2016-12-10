import Ember from 'ember';

export default Ember.Controller.extend({

  application: Ember.inject.controller(),
  content: Ember.computed.alias('application.archiveBookmarks'),

});
