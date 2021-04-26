import BookmarksNewController from 'webmarks/controllers/bookmarks/new';
import { inject as service } from '@ember/service';

var BookmarksEditController = BookmarksNewController.extend({

  i18n: service(),
  showConfirmation: false,

  actions: {

    remove: function(item) {
      if (!confirm(this.i18n.t('bookmark.edit.form.confirmDeletion'))) { return false; }

      this.storage.removeBookmark(item.id)
        .then(() => {
          this.set('showConfirmation', true);
        })
        .catch(error => {
          console.log('ERROR:');
          console.log(error);
        });
    }

  }

});

export default BookmarksEditController;
