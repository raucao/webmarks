import { isEmpty } from '@ember/utils';
import $ from 'jquery';
import EmberObject, { computed } from '@ember/object';

export default EmberObject.extend({

  id: '',
  url: '',
  title: '',
  description: '',
  tags: null,
  createdAt: null,
  updatedAt: null,

  init() {
    this._super(...arguments);
  },

  createdAtTimeAgo: computed('createdAt', function() {
    return moment(this.get('createdAt')).fromNow();
  }),

  updatedAtTimeAgo: computed('updatedAt', function() {
    return moment(this.get('updatedAt')).fromNow();
  }),

  domain: computed('url', function() {
    var a = document.createElement('a');
    a.href = this.get('url');
    return a.hostname;
  }),

  serialize: computed('url', 'title', 'description', 'tags', 'createdAt', function() {
    var serialized = this.getProperties('url', 'title', 'description');
    var tags = this.get('tags') || [];

    var createdAt = this.get('createdAt');
    if (createdAt !== null) {
      serialized.createdAt = createdAt;
    }

    if (tags && tags.length > 0) {
      if ((typeof tags) === 'string') { tags = tags.split(','); }

      serialized.tags = tags.map($.trim)
                            .reject(t => isEmpty(t));
    }

    return serialized;
  })

});
