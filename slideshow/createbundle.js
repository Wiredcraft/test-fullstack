const concat = require('concat');

(async function build() {
  const files = [
    './dist/slideshow/runtime.js',
    './dist/slideshow/polyfills.js',
    './dist/slideshow/main.js'
  ];

  await concat(files, '../frontend/src/assets/js/slideshow.js');
})();
