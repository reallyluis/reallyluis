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
      // TODO: dynamically up version on build
      // str.replace(
      //     /(^const version\=)(\d+)(.*)$/gi,
      //     (str, pre, ver, post) => pre + (parseInt(ver, 10) + 1) + post);
      fs.writeFile('./public/service-worker.js', content, 'utf8', () => {
        console.log('minify SW done!');
      });
    })
    .catch((err) => {
      console.log('minify SW failed!');
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
