const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input-real.txt`).toString();
const NUM_KNOTS = 10;

// Format the input
input = input.split('\n').map(c => {
  c = c.split(' ');
  c[1] = Number(c[1]);
  return c
});

// All of the visited coordinates
let visited = new Set();

let knots = [];
for (let i = 0; i < NUM_KNOTS; i++) {
  let newKnot = [0,0];
  knots.push(newKnot);
}

input.forEach((command) => {
  let [dir,val] = command;
  for (let i = 0; i < val; i++) {
    // Move the head first
    if (dir == 'U') knots[0][1] += 1; // North
    if (dir == 'R') knots[0][0] += 1; // East
    if (dir == 'D') knots[0][1] -= 1; // South
    if (dir == 'L') knots[0][0] -= 1; // West
    for (let i = 1; i < knots.length; i++) {
      let curr = knots[i];
      let prev = knots[i-1];
      // Figure out if the current knot needs to be aligned
      if (prev[1] - curr[1] == 2 && prev[0] - curr[0] == 2) { // North-East
        curr[1] += 1;
        curr[0] += 1;
      }
      if (prev[1] - curr[1] == -2 && prev[0] - curr[0] == 2) { // South-East
        curr[1] -= 1;
        curr[0] += 1;
      }
      if (prev[1] - curr[1] == -2 && prev[0] - curr[0] == -2) { // South-West
        curr[1] -= 1;
        curr[0] -= 1;
      }
      if (prev[1] - curr[1] == 2 && prev[0] - curr[0] == -2) { // North-West
        curr[1] += 1;
        curr[0] -= 1;
      }
      // Figure out if the current knot needs to be aligned
      if (prev[1] - curr[1] == 2 && prev[0] != curr[0]) curr[0] = prev[0]; // North
      if (prev[0] - curr[0] == 2 && prev[1] != curr[1]) curr[1] = prev[1]; // East
      if (prev[1] - curr[1] == -2 && prev[0] != curr[0]) curr[0] = prev[0]; // South
      if (prev[0] - curr[0] == -2 && prev[1] != curr[1]) curr[1] = prev[1]; // West
      // Figure out where the current knot needs to be
      if (prev[1] - curr[1] == 2) curr[1] += 1; // North
      if (prev[0] - curr[0] == 2) curr[0] += 1; // East
      if (prev[1] - curr[1] == -2) curr[1] -= 1; // South
      if (prev[0] - curr[0] == -2) curr[0] -= 1; // West
    }
    // Add to visited
    visited.add(knots.at(-1).toString());
  }
});

function printKnots (knots) {
  let arr2d = [];
  for (let i = 0; i < 5; i++) {
    arr2d.push(['.','.','.','.','.','.']);
  }
  for (let i = knots.length - 1; i >= 0; i--) {
    let c = i == 0 ? 'H' : `${i}`;
    arr2d[arr2d.length-1-knots[i][1]][knots[i][0]] = c
  }
  console.log(arr2d.map(row=>row.join('')).join('\n')+'\n');
}

console.log(visited.size);