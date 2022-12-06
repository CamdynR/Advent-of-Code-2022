const fs = require('fs');
let input = fs.readFileSync(__dirname + '/input-real.txt', {
  encoding: 'UTF-8',
});

let windowLength = 4;

for (let i = 0; i < input.length - windowLength; i++) {
  let marker = input.substring(i,i+windowLength);
  if (new Set(marker.split('')).size == windowLength) {
    console.log(`Marker location: ${i+windowLength}`);
    return;
  }
}