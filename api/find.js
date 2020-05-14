const find = require('../lib/find.js');
const {readFileSync} = require('fs');
const path = require('path');

const jsonString = readFileSync(path.join(__dirname, './words_dictionary.json'));
const dictionary = JSON.parse(jsonString);

module.exports = (req, res) => {
  const { pattern = '_______' } = req.query;

  const results = [...find(pattern, dictionary)];

  res.status(200).json(results);
}