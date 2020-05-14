import { combinations } from './lib/blanks.js';
import { readFileSync, appendFileSync } from 'fs';

// try not to run this, it will probably fill your harddrive
const jsonString = readFileSync('./api/words_dictionary.json')
const words = JSON.parse(jsonString);
let count = 0;

for (let word in words) {
  if (word.length < 3) continue;
  if ((count++) % 100) console.log("Blanking", word);

  for (let blanks = 1; blanks < word.length; blanks++) {
    const blankedWords = combinations(word, blanks);
    blankedWords.forEach(blankedWord => {
      appendFileSync(`./data/${word.length}`, `${blankedWord},${word}\n`);
    })
  }
}