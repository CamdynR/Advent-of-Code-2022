const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input-real.txt`).toString();

input = input.split('\n').map(l => l.split('').map(t => Number(t)));

let numVisible = (input.length*2) + ((input[0].length-2)*2);
for (let row = 1; row < input.length-1; row++) {
  for (let col = 1; col < input[row].length-1; col++) {
    if (isVisible([row,col], input)) numVisible += 1;
  }
}

function isVisible(coord, map) {
  let val = map[coord[0]][coord[1]];
  let visibility = [1,1,1,1]; // N, E, S, W
  // Check from the north
  for (let i = 0; i < coord[0]; i++) {
    if (map[i][coord[1]] >= val) visibility[0] = 0;
  }
  // Check from the east
  for (let i = map[coord[0]].length-1; i > coord[1]; i--) {
    if (map[coord[0]][i] >= val) visibility[1] = 0;
  }
  // Check from the south
  for (let i = map.length-1; i > coord[0]; i--) {
    if (map[i][coord[1]] >= val) visibility[2] = 0;
  }
  // Check from the west
  for (let i = 0; i < coord[1]; i++) {
    if (map[coord[0]][i] >= val) visibility[3] = 0;
  }
  return visibility.includes(1);
}

console.log(`Number of Visible Trees: ${numVisible}`);