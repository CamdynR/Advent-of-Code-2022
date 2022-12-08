const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input-real.txt`).toString();

input = input.split('\n').map(l => l.split('').map(t => Number(t)));

let highestScenic = 0;
for (let row = 0; row < input.length; row++) {
  for (let col = 0; col < input[row].length; col++) {
    let score = calcScenic([row,col], input);
    highestScenic = score > highestScenic ? score : highestScenic;
  }
}

function calcScenic(coord, map) {
  let val = map[coord[0]][coord[1]];
  let scenicScores = [0,0,0,0]; // N, E, S, W
  // Check the north
  for (let i = coord[0]-1; i >= 0; i--) {
    scenicScores[0] += 1;
    if (map[i][coord[1]] >= val) break;
  }
  // Check the east
  for (let i = coord[1]+1; i < map[coord[0]].length; i++) {
    scenicScores[1] += 1;
    if (map[coord[0]][i] >= val) break;
  }
  // Check the south
  for (let i = coord[0]+1; i < map.length; i++) {
    scenicScores[2] += 1;
    if (map[i][coord[1]] >= val) break;
  }
  // Check the west
  for (let i = coord[1]-1; i >= 0; i--) {
    scenicScores[3] += 1;
    if (map[coord[0]][i] >= val) break;
  }
  return scenicScores.reduce((a,b) => a*b);
}

console.log(`Highest Scenic Score Possible: ${highestScenic}`);