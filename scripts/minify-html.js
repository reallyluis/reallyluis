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
        console.log('minify HTML done!');
      });
    })
    .catch((err) => {
      console.log('minify HTML failed!');
    });
