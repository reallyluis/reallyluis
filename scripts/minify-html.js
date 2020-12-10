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
      fs.writeFile('./public/index.html', content, 'utf8', () => {
        console.log('minify index.html done!');
      });
    })
    .catch((err) => {
      console.log('minify index.html failed!');
    });
