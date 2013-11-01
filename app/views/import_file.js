var ImportFileView = Ember.TextField.extend({
  type: 'file',
  attributeBindings: ['name'],

  change: function(evt) {
    var self = this;
    var input = evt.target;

    if (input.files && input.files[0]) {
      var reader = new FileReader();
      var that = this;

      reader.onload = function(e) {
        self.get('controller').importDeliciousFile( e.target.result );
      };

      reader.readAsText(input.files[0]);
    }
  }
});

export default ImportFileView;
