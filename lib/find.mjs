const matcher = (pattern) => {
  if (pattern instanceof RegExp) {
    // check that the pattern doesn't contain wild cards
    if (pattern.toLowerCase().toString().indexOf('*') > -1) throw new Error('Wildcards not supported');
    return pattern.test.bind(pattern);
  }
  else {
    // Build a function that will test. Why? Because in future will also check to see if certain chars are the same.
    // Format is: 
    //  _ = any char.
    //    e.g, _ Letter _, this will match [A..Z](Letter)[A..Z]
    // [Digit] = named constraint
    //    e,g - L 1 1 K, will match LOOK and LEEK, but not LACK
    // This is a naieve algorithm, it will go through each entry because it doesn't know if dictionary is sorted.
    let chars = pattern.toLowerCase().split('');
    let namedConstraints = {};
    let expressions = [];

    for (let i in chars) {
      const char = chars[i];
      if (char == "_") continue;
      if (/[0-9!@£#\$%^&*()]/.test(char)) { 
        if (char in namedConstraints === false) namedConstraints[char] = [];
        namedConstraints[char].push(i);
        continue;
      }
      expressions.push(`word[${i}] === '${char}'`);
    };
    
    // Merge the named constraints
    for (let named in namedConstraints) {
      for (let n = 0; n <= namedConstraints[named].length - 1; n++) {
        expressions.push(`word[${namedConstraints[named][n]}] === word[${namedConstraints[named][n+1]}]`);
        n = namedConstraints[named][n+1];
      }
    }

    const expression = expressions.filter(f => f !== '').join('&&')

    let functionTemplate = `
      if (word.length != ${pattern.length}) return false;
      return (${expression});
    `;
    return new Function('word', functionTemplate);
  }
}

function *find(pattern, dictionary) {
  const test = matcher(pattern);
  for (let word of dictionary) {
    if (test(word)) {
      yield word;
    }
  }
}

export { find };