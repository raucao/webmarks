import ArchiveNewController from 'webmarks/controllers/archive/new';
import { inject as service } from '@ember/service';

var ArchiveEditController = ArchiveNewController.extend({

  i18n: service(),

  actions: {

    remove: function(item) {
      if (!confirm(this.i18n.t('bookmark.edit.form.confirmDeletion'))) { return false; }

      this.storage.removeBookmark(item.id)
        .then(() => {
          this.transitionToRoute('index');
        })
        .catch((error) => {
          alert('Something went wrong.');
          console.log('ERROR:');
          console.log(error);
        });
    }

  }

});

export default ArchiveEditController;
