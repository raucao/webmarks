import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bookmark search', function(hooks) {
  setupRenderingTest(hooks);

  test('clear-search button', async function(assert) {
    this.set('filterText', '');
    await render(hbs`{{bookmark-search filterText=filterText}}`);

    assert.dom(this.$('#clear-search')[0]).hasClass('hidden', 'is hidden when search field is empty');

    this.set('filterText', 'foo');
    assert.dom(this.$('#clear-search')[0]).hasNoClass('hidden', 'is visible when search field is not empty');

    await click('#clear-search');
    assert.dom(this.$('#clear-search')[0]).hasClass('hidden', 'clears search input when clicked');
  });
});
