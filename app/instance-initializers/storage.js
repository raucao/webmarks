export default {
  name: 'storage',

  initialize: function(app) {
    app.lookup('service:storage').setup();
  }
};
