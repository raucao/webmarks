// Do not forget to import moment locale at ember-cli-build.js

export default {
  bookmark: {
    new: {
      header: 'Ajouter un nouveau favori',
      bookmarklet: {
        use_text: 'Utiliser le bookmarklet',
        drag_text: 'Glisser ce lien vers votre barre de favoris:',
        create_webmark: 'Créer le Webmark'
      }
    },
    index: {
      updated: 'modifié',
      you_have_not_stored_any_bookmarks_yet: 'Tu n\'as pas encore enregistré de favoris',
      add_the_first_one: 'Ajouter le premier'
    },
    edit: {
      header: 'Modifier le favori',
      form: {
        title: 'Titre',
        url: 'URL',
        description: 'Description',
        tags: 'Tags',
        save: 'Enregistrer',
        cancel: 'Annuler',
        delete: 'Supprimer',
        confirmDeletion: 'Supprimer pour toujours ?'
      }
    },
    saved: {
      backToList: 'Retour à la liste'
    }
  },
  links: {
    add_new: 'Ajouter',
    edit: 'Modifier',
    delete: 'Supprimer'
  },
  inputs: {
    text_fields: {
      'search.placeholder': 'Chercher'
    }
  }
};
