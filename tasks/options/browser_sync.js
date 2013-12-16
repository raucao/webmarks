module.exports = {
  compile: {
    files: {
      src: [
        'tmp/public/assets/*.css',
        'tmp/public/assets/*.js'
      ]
    },
    options: {
      watchTask: true,
    }
  }
};
