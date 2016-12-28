import Ember from 'ember';

export default Ember.Component.extend({

  autofocusTitleField: function() {
    if (Ember.isEmpty(this.get('bookmark.title'))) {
      this.$('input#title').focus();
    }
  }.on('didInsertElement'),

  autocompleteTags: function() {
    let availableTags = this.get('availableTags');
    let split = function(val) {
      return val.split(/,\s*/);
    };
    let extractLast = function(term) {
      return split(term).pop();
    };
    this.$("input#tags").bind("keydown", function(event) {
      if (event.keyCode === Ember.$.ui.keyCode.TAB &&
          Ember.$(this).data("autocomplete").menu.active) {
        event.preventDefault();
      }
    }).autocomplete({
      autoFocus: true,
      minLength: 0,
      position: {
        my: "left top",
        at: "left+110 bottom",
        collision: "none"
      },
      source: function(request, response) {
        return response(Ember.$.ui.autocomplete.filter(availableTags, extractLast(request.term)));
      },
      focus: function() {
        return false;
      },
      select: function(event, ui) {
        let terms;
        terms = split(this.value);
        terms.pop();
        terms.push(ui.item.value);
        terms.push("");
        this.value = terms.join(", ");
        return false;
      }
    });
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
