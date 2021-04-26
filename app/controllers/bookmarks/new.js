import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({

  storage: service(),

  queryParams: ['title', 'url', 'description'],
  title: null,
  url: null,
  description: null,
  showConfirmation: false,

  bookmarkletUsed: false,

  bookmarkletLink: computed(function() {
    return htmlSafe(`javascript:void(location.href="${window.location.origin}/bookmarks/new/?url="+encodeURIComponent(location.href)+"&title="+encodeURIComponent(document.title))`);
  }),

  actions: {

    commit () {
      this.storage.storeBookmark(this.model)
        .then(() => {
          this.set('showConfirmation', true);
          // TODO add new tags to taglist cache
        })
        .catch(error => {
          console.log('ERROR:');
          console.log(error);
        });
    },

    cancel () {
      this.transitionToRoute('index');
    }

  }

});
