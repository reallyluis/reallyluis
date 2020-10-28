const minify = require('minify');
const fs = require('fs');

const options = {
  html: {
    removeAttributeQuotes: false,
    removeOptionalTags: false,
  },
};

minify('./src/index.html', options)
    .then((content) => {
      fs.writeFile('./dist/index.html', content, 'utf8', () => {
        console.log('minify index.html done!');
      });
    })
    .catch((err) => {
      console.log('minify index.html failed!');
    });

minify('./src/fallback.html', options)
    .then((content) => {
      fs.writeFile('./dist/fallback.html', content, 'utf8', () => {
        console.log('minify fallback.html done!');
      });
    })
    .catch((err) => {
      console.log('minify fallback.html failed!');
    });
