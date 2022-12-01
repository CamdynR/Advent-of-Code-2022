const fs = require('fs');
let input = fs.readFileSync(__dirname + '/input-real.txt', {
  encoding: 'UTF-8',
});

// Split the input by elves
input = input.split('\n\n');
// Split each calories up and map each calorie to a number
input = input.map((elf) => elf.split('\n').map((num) => Number(num)));
// Map each calorie list to the sum of the entire list
input = input.map((elf) => elf.reduce((a, b) => Number(a) + Number(b)));
// Sort the list
input = input.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
});
// Log the maximum number in that list
console.log(`Max Calories: ${input[input.length - 1]}`);
// Log the top 3 numbers in that list
console.log(`Top 3 Combined: ${input.pop() + input.pop() + input.pop()}`);
