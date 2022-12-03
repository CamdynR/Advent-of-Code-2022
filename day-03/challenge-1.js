const fs = require('fs');
let input = fs.readFileSync(__dirname + '/input-real.txt', {
  encoding: 'UTF-8',
});

// Split into reach individual rucksack
input = input.split('\n');
// Filter out any empty strings
input = input.filter(str => str !== '');
// Map each rucksack to each pouch
input = input.map((sack) => {
  let i = sack.length / 2;
  return [sack.substring(0, i).split(''), sack.substring(i).split('')]
});
// Find each pouches intersections
input = input.map((pouches) => {
  return pouches[0].filter((item) => pouches[1].includes(item)).pop();
});
// Convert chars to character codes
input = input.map((char) => {
  let charCode = char.charCodeAt(0);
  if (charCode < 91) {
    return charCode - 38;
  } else {
    return charCode - 96;
  }
});
// Sum the input
input = input.reduce((a,b) => a + b);
// Log the answer
console.log(`Answer: ${input}`);