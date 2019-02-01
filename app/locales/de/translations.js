// Do not forget to import moment locale at ember-cli-build.js

export default {
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
      you_have_not_stored_any_bookmarks_yet: 'Du hast noch keine Web-Lesezeichen gespeichert.',
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
        cancel: 'Abbrechen',
        delete: 'Löschen',
        confirmDeletion: 'Für immer löschen?'
      }
    },
    saved: {
      backToList: 'Zurück zur Übersicht'
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
