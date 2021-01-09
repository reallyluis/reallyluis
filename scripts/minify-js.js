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

// App js files
['helpers.js', 'renderers.js', 'index.js'].forEach((fileName) => {
  minify(`./src/js/${fileName}`, options)
      .then((content) => {
        const regexAPI = /process\.env\.FIREBASE\_API\_KEY/g;

        fs.writeFile(
            `./public/js/${fileName}`,
            content.replace(regexAPI, `'${process.env.FIREBASE_API_KEY}'`),
            'utf8',
            () => {
              console.log(`minify ${fileName} done!`);
            });
      })
      .catch((err) => {
        console.log(`minify ${fileName} failed!`);
      });
});
