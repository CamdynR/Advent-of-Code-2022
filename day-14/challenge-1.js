const fs = require('fs');
const SETUP = { split: '\n', txt: 'real.txt' };
if (process.argv[2] == 'test') SETUP.txt = 'test.txt';
let input = fs.readFileSync(`${__dirname}/input-${SETUP.txt}`).toString().replaceAll('\r', '');

input = input.split('\n').map(l => l.split(' -> ').map(p => p.split(',').reverse().map(v => Number(v))));

let min = [Infinity,Infinity];
let max = [-Infinity,-Infinity];
let dropPoint = 500;
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    min[0] = input[i][j][0] < min[0] ? input[i][j][0] : min[0];
    min[1] = input[i][j][1] < min[1] ? input[i][j][1] : min[1];
    max[0] = input[i][j][0] > max[0] ? input[i][j][0] : max[0];
    max[1] = input[i][j][1] > max[1] ? input[i][j][1] : max[1];
  }
}

// Normalize the columns
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    input[i][j][1] = input[i][j][1] - min[1];
  }
}
dropPoint = dropPoint - min[1] + 1;
max[1] = max[1] - min[1];
min[1] = 0;

let slice = [];
for (let row = 0; row <= max[0]; row++) {
  slice.push([]);
  for (let col = 0; col <= max[1]; col++) {
    slice[row].push('.');
  }
}

let nums = [' '];
for (let i = 0; i < slice[0].length; i++) {
  nums.push(i % 10);
}
slice.forEach((r,i) => r.unshift(i % 10));
slice.unshift(nums);
slice[1][dropPoint] = '+';

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length-1; j++) {
    // West & East
    if (input[i][j][0] == input[i][j+1][0]) {
      // East
      if (input[i][j][1] < input[i][j+1][1]) {
        for (let col = input[i][j][1]; col <= input[i][j+1][1]; col++) {
          slice[input[i][j][0]+1][col+1] = '#';
        }
      }
      // West
      if (input[i][j][1] > input[i][j+1][1]) {
        for (let col = input[i][j+1][1]; col <= input[i][j][1]; col++) {
          slice[input[i][j][0]+1][col+1] = '#';
        }
      }
    // North and South
    } else {
      // South
      if (input[i][j][0] < input[i][j+1][0]) {
        for (let row = input[i][j][0]; row <= input[i][j+1][0]; row++) {
          slice[row+1][input[i][j][1]+1] = '#';
        }
      }
      // North
      if (input[i][j][0] > input[i][j+1][0]) {
        for (let row = input[i][j+1][0]; row <= input[i][j][0]; row++) {
          slice[row+1][input[i][j][1]+1] = '#';
        }
      }
    }
  }
}

let numGrains = 0;
let currGrain = [0,dropPoint];
let canAdd = true;
// // currGrain[0] < max[0]
// while (canAdd) {
//   let nextSpace = slice[currGrain[0]+1][currGrain[1]];
//   if (nextSpace == '.') {
//     currGrain[0] += 1;
//   } else if (nextSpace == '#') {
//     let bottomLeft, bottomRight;
//     // if (currGrain[])
//     let bottomLeft = slice[currGrain[0]+1][currGrain[1]-1];
//     let bottomRight = 
//     if (slice[currGrain[0]+1][currGrain[1]])
//   }
// }

console.log(slice.map((r) => r.join('')).join('\n'));
console.log(`\nNumber of Grains: ${numGrains}`);