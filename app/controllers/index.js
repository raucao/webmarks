var IndexController = Ember.ArrayController.extend({

  needs: ['application'],

  contentBinding: 'controllers.application.archiveBookmarks',

});

export default IndexController;
