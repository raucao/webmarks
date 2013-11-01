var Bookmark = Ember.Object.extend({

  url: '',
  title: '',
  description: '',
  tags: [],
  createdAt: null,
  updatedAt: null,

  domain: function() {
    var a = document.createElement('a');
    a.href = this.get('url');
    return a.hostname;
  }.property('url'),

  serialize: function() {
    return this.getProperties('url', 'title', 'description');
  }.property()

});

export default Bookmark;
