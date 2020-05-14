const find = require('../lib/find.js');
const {readFileSync} = require('fs');
const path = require('path');

const jsonString = readFileSync(path.join(__dirname, './words_dictionary.json'));
const template = readFileSync(path.join(__dirname, '../public/index.html'),'utf8');
const dictionary = JSON.parse(jsonString);

module.exports = (req, res) => {
  const { pattern = '_______' } = req.query;

  const results = [...find(pattern, dictionary)];

  const html = template
      .replace(/<title>C\(ross\|ode\)word Helper<\/title>/, `<title>C(ross|ode)word Helper: ${pattern}</title>`)
      .replace(/"><!--\[RESULTSAVAILABLE\]-->/g, `" class="available">`)
      .replace(/"><!--\[QUERY\]-->/g, `${pattern}">`)
      .replace(/<!--\[RESULTS\]-->/g, `<li>${results.join('</li><li>')}</li>`)

  res.status(200).send(html);
}