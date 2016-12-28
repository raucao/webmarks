import Ember from 'ember';

export default Ember.Controller.extend({

  storage: Ember.inject.service(),

  queryParams: ['title', 'url'],
  title: null,
  url: null,

  bookmarkletUsed: false,

  bookmarkletLink: Ember.computed(() => {
    return Ember.String.htmlSafe(`javascript:void(location.href="${window.location.origin}/bookmarks/new/?url="+encodeURIComponent(location.href)+"&title="+encodeURIComponent(document.title))`);
  }),

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
