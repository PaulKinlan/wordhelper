const find = require('../lib/find.js');
const { readFileSync } = require('fs');
const path = require('path');

const jsonString = readFileSync(path.join(__dirname, './words_dictionary.json'));
const template = readFileSync(path.join(__dirname, '../public/index.html'), 'utf8');
const dictionary = JSON.parse(jsonString);

module.exports = (req, res) => {
  const { pattern = '___' } = req.query;

  const results = [...find(pattern, dictionary)];

  if (req.headers.accept && req.headers.accept.indexOf('text/html') > -1) {
    const html = template
      .replace(/<title>C\(ross\|ode\)word Helper<\/title>/, `<title>C(ross|ode)word Helper: ${pattern}</title>`)
      .replace(/"><!--\[RESULTSAVAILABLE\]-->/g, `" class="available">`)
      .replace(/"><!--\[QUERY\]-->/g, `${pattern}">`)
      .replace(/<!--\[RESULTS\]-->/g, `<li>${results.join('</li><li>')}</li>`);

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', `s-maxage=600, max-age=600`);
    res.status(200).send(html);
  }
  else {
    // API calls can be cached because the UI won't change
    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
    res.status(200).json(results);
  }
}