import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({

  storage: service(),

  queryParams: ['title', 'url'],
  title: null,
  url: null,

  bookmarkletUsed: false,

  bookmarkletLink: computed(() => {
    return htmlSafe(`javascript:void(location.href="${window.location.origin}/archive/new/?url="+encodeURIComponent(location.href)+"&title="+encodeURIComponent(document.title))`);
  }),

  actions: {

    commit: function() {
      this.storage.storeBookmark(this.get('model.serialize')).then(() => {
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
