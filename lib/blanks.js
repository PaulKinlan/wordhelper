const segment = (word, blanks) => {
  const letters = word.split('');
  const letterCount = letters.length;
  const heads = [];
  const tails = [];

  for (let letter = 0; letter < letterCount; letter ++) {
    heads.push(word.slice(0, letter));
    tails.push(word.slice(letter + 1));
  }

  if (blanks == 1) { 
    // zip;
    return heads.map((_, i) => `${heads[i]}_${tails[i]}`);
  } 

  if (blanks > 1) {
    const words = [];
    for (let idx in tails) {
      // zip;
      const head = heads[idx];
      const newWords = segment(tails[idx], blanks - 1);
      for(let newWord of newWords) {
        words.push(`${head}_${newWord}`);
      }
    }
    
    return words;
  }
};

export {segment as combinations};