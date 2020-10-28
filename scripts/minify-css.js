const minify = require('minify');
const fs = require('fs');

const options = {
  css: {
    compatibility: '*',
  },
};

minify('./src/css/style.css', options)
    .then((content) => {
      fs.writeFile('./public/css/style.css', content, 'utf8', () => {
        console.log('minify CSS done!');
      });
    })
    .catch((err) => {
      console.log('minify CSS failed!');
    });
