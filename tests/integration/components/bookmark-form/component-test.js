import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bookmark form', function(hooks) {
  setupRenderingTest(hooks);

  test('it sets focus on the title field when empty', async function(assert) {
    this.set('bookmark', {title: null});
    await render(hbs`{{bookmark-form bookmark=bookmark}}`);

    assert.dom('input#title').hasValue('');
    assert.equal(document.activeElement.id, 'title');
  });

  test('does not set focus on the title field when filled', async function(assert) {
    this.set('bookmark', {title: 'foo bar'});
    await render(hbs`{{bookmark-form bookmark=bookmark}}`);

    assert.equal(this.get('bookmark.title'), 'foo bar');
    assert.dom('input#title').hasValue('foo bar');
    assert.notEqual(document.activeElement.id, 'title');
  });
});
