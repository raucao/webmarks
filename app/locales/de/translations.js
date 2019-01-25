// Do not forget to import moment locale at ember-cli-build.js

export default {
  welcome_page: {
    welcome_to_webmarks: 'Willkommen bei Webmarks!',
    please_connect_your_remote_storage_first: '<p>Mit Webmarks kannst du Bookmarks in deinem eigenen Datenspeicher ablegen und synchronisieren.</p><p>Bitte verbinde nun deinen Datenspeicher (rechts oben).',
    upcoming_relase_note: '(Dies ist für die kommende Release-Version von Webmarks nicht erforderlich.)'
  },
  bookmark: {
    new: {
      header: 'Bookmark hinzufügen',
      bookmarklet: {
        use_text: 'Verwende das Lesezeichen',
        drag_text: 'Ziehe den folgenden Link in deine Lesezeichen-Symbolleiste:',
        create_webmark: 'Webmark erstellen'
      }
    },
    index: {
      updated: 'aktualisiert',
      you_have_not_stored_any_bookmarks_yet: 'Du hast noch keine Lesezeichen gespeichert.',
      add_the_first_one: 'Füge das erste hinzu'
    },
    edit: {
      header: 'Bookmark aktualisieren',
      form: {
        title: 'Titel',
        url: 'URL',
        description: 'Beschreibung',
        tags: 'Tags',
        save: 'Speichern',
        cancel: 'Abbrechen'
      }
    }
  },
  links: {
    add_new: 'Neu hinzufügen',
    edit: 'Editieren',
    delete: 'Löschen'
  },
  inputs: {
    text_fields: {
      'search.placeholder': 'Suche'
    }
  }
};
