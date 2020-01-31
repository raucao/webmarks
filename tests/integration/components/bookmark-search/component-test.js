import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bookmark search', function(hooks) {
  setupRenderingTest(hooks);

  test('didInsertElement', async function(assert) {
    this.set('filterText', 'unhosted');
    await render(hbs`{{bookmark-search filterText=filterText}}`);

    assert.dom('#search-input').hasValue('unhosted', 'pre-fills the input value when filterText is set');
  });

  test('clear-search button', async function(assert) {
    this.set('searchInput', '');
    await render(hbs`{{bookmark-search searchInput=searchInput}}`);

    assert.dom(this.$('#clear-search')[0]).hasClass('hidden', 'is hidden when search field is empty');

    this.set('searchInput', 'foo');
    assert.dom(this.$('#clear-search')[0]).hasNoClass('hidden', 'is visible when search field is not empty');

    await click('#clear-search');
    assert.dom(this.$('#clear-search')[0]).hasClass('hidden', 'clears search input when clicked');
  });
});
