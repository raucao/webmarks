import $ from 'jquery';
import Component from '@ember/component';
import { observer } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Component.extend({

  autofocusTitleField: function() {
    if (isEmpty(this.get('bookmark.title'))) {
      this.$('input#title').focus();
    }
  },

  autocompleteTags: function() {
    let availableTags = this.availableTags;
    let split = function(val) {
      return val.split(/,\s*/);
    };
    let extractLast = function(term) {
      return split(term).pop();
    };
    this.$("input#tags").bind("keydown", function(event) {
      if (event.keyCode === $.ui.keyCode.TAB &&
          $(this).data("uiAutocomplete").menu.active) {
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
        return response($.ui.autocomplete.filter(availableTags, extractLast(request.term)));
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
  },

  didInsertElement: function() {
    this._super(...arguments);

    this.autofocusTitleField();
    this.autocompleteTags();
  },

  onUrlChange: observer('bookmark.url', function() {
    this.bookmark.set('urlChanged', true);
  }),

  actions: {

    commit() {
      this.commit();
    },

    cancel() {
      this.cancel();
    },

    remove(bookmark) {
      this.remove(bookmark);
    }

  }

});
