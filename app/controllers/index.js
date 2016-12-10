import Ember from 'ember';

export default Ember.Controller.extend({

  needs: ['application'],

  contentBinding: 'controllers.application.archiveBookmarks',

});
