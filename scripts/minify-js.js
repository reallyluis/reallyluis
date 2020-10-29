const minify = require('minify');
const fs = require('fs');

const options = {
  js: {
    ecma: 5,
  },
};

// Service workder js
minify('./src/service-worker.js', options)
    .then((content) => {
      fs.writeFile('./public/service-worker.js', content, 'utf8', () => {
        console.log('minify SW done!');
      });
    })
    .catch((err) => {
      console.log('minify SW failed!');
    });

// Init firebase js
minify('./src/js/firebase.js', options)
    .then((content) => {
      fs.writeFile('./public/js/firebase.js', content, 'utf8', () => {
        console.log('minify firebase.js done!');
      });
    })
    .catch((err) => {
      console.log('minify index.js failed!');
    });

// Main app js
minify('./src/js/index.js', options)
    .then((content) => {
      fs.writeFile('./public/js/index.js', content, 'utf8', () => {
        console.log('minify index.js done!');
      });
    })
    .catch((err) => {
      console.log('minify index.js failed!');
    });
