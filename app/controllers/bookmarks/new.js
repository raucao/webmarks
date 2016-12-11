import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['title', 'url'],

  storage: Ember.inject.service(),
  bookmarkletUsed: false,

  actions: {
    commit: function() {
      this.get('storage').storeBookmark(this.get('model.serialize')).then(() => {
        this.transitionToRoute('index');
      }).catch((error) => {
        alert('Something went wrong.');
        console.log('ERROR:');
        console.log(error);
      });
    },

    cancel: function() {
      this.transitionToRoute('index');
    }
  }

});
