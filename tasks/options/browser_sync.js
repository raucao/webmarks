module.exports = {
  compile: {
    files: {
      src: [
        'tmp/result/assets/*.css',
        'tmp/result/assets/*.js'
      ]
    },
    options: {
      watchTask: true,
    }
  }
};
