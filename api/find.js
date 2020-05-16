const find = require('../lib/find.js');
const {readFileSync} = require('fs');
const path = require('path');

const jsonString = readFileSync(path.join(__dirname, './words_dictionary.json'));
const dictionary = JSON.parse(jsonString);

module.exports = (req, res) => {
  const { pattern = '_______' } = req.query;

  const results = [...find(pattern, dictionary)];

  // API calls can be cached because the UI won't change
  res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
  res.status(200).json(results);
}