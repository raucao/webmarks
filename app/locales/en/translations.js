// Do not forget to import moment locale at ember-cli-build.js

export default {
  welcome_page: {
    welcome_to_webmarks: 'Welcome to Webmarks!',
    please_connect_your_remote_storage_first: '<p>With Webmarks, you can save and synchronize bookmarks in a storage of your choice.</p><p>Please connect your remote storage first.</p>',
    upcoming_relase_note: '(This will not be necessary for the upcoming release version of Webmarks.)'
  },
  bookmark: {
    new: {
      header: 'Add a new bookmark',
      bookmarklet: {
        use_text: 'Use the bookmarklet',
        drag_text: 'Drag this to your bookmarks toolbar:',
        create_webmark: 'Create Webmark'
      }
    },
    index: {
      updated: 'updated',
      you_have_not_stored_any_bookmarks_yet: 'You haven&#39;t stored any bookmarks yet.',
      add_the_first_one: 'Add the first one'
    },
    edit: {
      header: 'Update bookmark',
      form: {
        title: 'Title',
        url: 'URL',
        description: 'Description',
        tags: 'Tags',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Remove',
        confirmDeletion: 'Delete forever?'
      }
    }
  },
  links: {
    add_new: 'Add new',
    edit: 'Edit',
    delete: 'Delete'
  },
  inputs: {
    text_fields: {
      'search.placeholder': 'Search'
    }
  }
};
