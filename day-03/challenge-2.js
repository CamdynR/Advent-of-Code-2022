const fs = require('fs');
let input = fs.readFileSync(__dirname + '/input-real.txt', {
  encoding: 'UTF-8',
});

// Split into reach individual rucksack
input = input.split('\n');
// Filter out any empty strings
input = input.filter(str => str !== '').map(str => str.split(''));
// Create the groups
let tempInput = [];
let currGroup = [];
for (let i = 0; i < input.length; i++) {
  currGroup.push(input[i]);
  if (i % 3 == 2 && currGroup?.length == 3) {
    tempInput.push(currGroup);
    currGroup = [];
  }
}
input = tempInput;
// Find each groups intersections
input = input.map((group) => {
  return group[0].filter((item) => {
    return group[1].includes(item) && group[2].includes(item)
  }).pop();
});
// Sort the input
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