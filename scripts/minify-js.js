require('dotenv').config();

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
      const regexVER = /SERVICE\_WORKER\_VERSION/g;
      const random5Digits = ('' + Math.random()).substring(2, 7);

      fs.writeFile(
          './public/service-worker.js',
          content.replace(regexVER, `"${random5Digits}"`),
          'utf8',
          () => {
            console.log('minify SW done!');
          });
    })
    .catch((err) => {
      console.log('minify SW failed!');
    });

// Modules js
minify('./src/js/helpers.js', options)
    .then((content) => {
      fs.writeFile(
          './public/js/helpers.js', content, 'utf8',
          () => {
            console.log('minify helpers.js done!');
          });
    })
    .catch((err) => {
      console.log('minify helpers.js failed!');
    });
minify('./src/js/renderers.js', options)
    .then((content) => {
      fs.writeFile(
          './public/js/renderers.js', content, 'utf8',
          () => {
            console.log('minify renderers.js done!');
          });
    })
    .catch((err) => {
      console.log('minify renderers.js failed!');
    });

// Main app js
minify('./src/js/index.js', options)
    .then((content) => {
      const regexAPI = /process\.env\.FIREBASE\_API\_KEY/g;

      fs.writeFile(
          './public/js/index.js',
          content.replace(regexAPI, `'${process.env.FIREBASE_API_KEY}'`),
          'utf8',
          () => {
            console.log('minify index.js done!');
          });
    })
    .catch((err) => {
      console.log('minify index.js failed!');
    });
