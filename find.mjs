import { find } from './lib/find.mjs';
import { readFileSync, appendFileSync } from 'fs';

const jsonString = readFileSync('./api/words_dictionary.json')
const words = JSON.parse(jsonString);

console.time("Custom");
  find('_a___ing', words);
console.timeEnd("Custom");

console.time("Custom with constraints");
  const results = [find('r1m1mb1r', words)];
console.timeEnd("Custom with constraints");

console.time("Regex");
   find(/^.a...ing$/, words);
console.timeEnd("Regex");