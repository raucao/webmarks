import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({

  storage: service(),

  queryParams: ['title', 'url'],
  title: null,
  url: null,
  showConfirmation: false,

  bookmarkletUsed: false,

  bookmarkletLink: computed(() => {
    return htmlSafe(`javascript:void(location.href="${window.location.origin}/archive/new/?url="+encodeURIComponent(location.href)+"&title="+encodeURIComponent(document.title))`);
  }),

  actions: {

    commit () {
      this.storage.storeBookmark(this.get('model.serialize')).then(() => {
        this.set('showConfirmation', true);
      }).catch((error) => {
        console.log('ERROR:');
        console.log(error);
      });
    },

    cancel () {
      this.transitionToRoute('index');
    }

  }

});
