const fs = require('fs');
let input = fs.readFileSync(__dirname + '/input-real.txt', {
  encoding: 'UTF-8',
});

// Format input
input = input.split('\n').map(pair => {
  return pair.split(',').map(range => {
    return range.split('-').map(val => Number(val))
  })
});

// Count the overlaps
let numOverlap = 0;
input.forEach((pair) => {
  // Check if first num in first pair is contained within second pair
  if (pair[0][0] >= pair[1][0] && pair[0][0] <= pair[1][1]) {
    numOverlap += 1;
  // Check if second num in first pair is contained within second pair
  } else if (pair[0][1] >= pair[1][0] && pair[0][1] <= pair[1][1]) {
    numOverlap += 1;
  // Check if first pair is contained within second pair
  } else if (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) {
    numOverlap += 1;
  // Check if second pair is contained within first pair
  } else if (pair[1][0] >= pair[0][0] && pair[1][1] <= pair[0][1]) {
    numOverlap += 1;
  }
});

console.log(`Overlap Count: ${numOverlap}`);