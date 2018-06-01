import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bookmark search', function(hooks) {
  setupRenderingTest(hooks);

  test('clear-search button', async function(assert) {
    this.set('filterText', '');
    await render(hbs`{{bookmark-search filterText=filterText}}`);

    assert.ok(this.$('#clear-search')[0].classList.contains('hidden'), 'is hidden when search field is empty');

    this.set('filterText', 'foo');
    assert.notOk(this.$('#clear-search')[0].classList.contains('hidden'), 'is visible when search field is not empty');

    await this.$('#clear-search').click();
    assert.ok(this.$('#clear-search')[0].classList.contains('hidden'), 'clears search input when clicked');
  });
});
