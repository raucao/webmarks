import Ember from 'ember';

export default Ember.Component.extend({

  autofocusTitleField: function() {
    if (Ember.isEmpty(this.get('bookmark.title'))) {
      this.$('input#title').focus();
    }
  }.on('didInsertElement'),

  actions: {

    commit() {
      this.sendAction('commit');
    },

    cancel() {
      this.sendAction('cancel');
    }

  }

});
