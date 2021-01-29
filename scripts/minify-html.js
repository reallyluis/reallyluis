const minify = require('minify');
const fs = require('fs');
const staticContent = require('../static-content.json');

const options = {
  html: {
    removeAttributeQuotes: false,
    removeOptionalTags: false,
  },
};

const updateContent = (content) => {
  return content
      .replace(/\{MY\_NAME\}/g, staticContent.name)
      .replace(/\{MY\_TITLE\}/g, staticContent.title)
      .replace(/\{MY\_EMAIL\}/g, staticContent.email)
      .replace(/\{MY\_USERNAME\}/g, staticContent.username)
      .replace(/\{APP\_DOMAIN\}/g, staticContent.domain);
};

minify('./src/index.html', options)
    .then((content) => {
      fs.writeFile(
          './public/index.html',
          updateContent(content),
          'utf8',
          () => {
            console.log('minify index.html done!');
          });
    })
    .catch((err) => {
      console.log('minify index.html failed!');
    });
