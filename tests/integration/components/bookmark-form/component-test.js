import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bookmark-form', 'Integration | Component | bookmark form', {
  integration: true
});

test('it sets focus on the title field when empty', function(assert) {
  this.set('bookmark', {title: null});
  this.render(hbs`{{bookmark-form bookmark=bookmark}}`);

  assert.equal(this.$('input#title').val(), '');
  assert.equal(document.activeElement.id, 'title');
});

test('does not set focus on the title field when filled', function(assert) {
  this.set('bookmark', {title: 'foo bar'});
  this.render(hbs`{{bookmark-form bookmark=bookmark}}`);

  assert.equal(this.get('bookmark.title'), 'foo bar');
  assert.equal(this.$('input#title').val(), 'foo bar');
  assert.notEqual(document.activeElement.id, 'title');
});
