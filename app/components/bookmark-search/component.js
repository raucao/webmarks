import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'div',
  classNames: ['search-input'],

  autofocusSearchField: function() {
    this.$('input[type=text]').focus();
  }.on('didInsertElement')

});
