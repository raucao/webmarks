var BookmarksNewController = Ember.ObjectController.extend({

  actions: {
    commit: function() {
      console.log(this.get('serialize'));
      self = this;

      remoteStorage.bookmarks.archive.store(this.get('serialize')).then(
        function(bookmark) {
          self.transitionToRoute('index');
        },
        function(error) {
          alert('Something went wrong.');
          console.log('ERROR:');
          console.log(error);
        }
      );
    }
  }

});

export default BookmarksNewController;
