const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input-real.txt`).toString();

// Format the input
input = input.split('\n').map(c => {
  c = c.split(' ');
  c[1] = Number(c[1]);
  return c
});

// All of the visited coordinates
let visited = new Set();

let head = [0,0]; // [x,y] on Cartesian plane
let tail = [0,0]; // [x,y] on Cartesian plane

input.forEach((command) => {
  let [dir,val] = command;
  for (let i = 0; i < val; i++) {
    // Move the head first
    if (dir == 'U') head[1] += 1; // North
    if (dir == 'R') head[0] += 1; // East
    if (dir == 'D') head[1] -= 1; // South
    if (dir == 'L') head[0] -= 1; // West
    // Figure out if the tail needs to be aligned
    if (head[1] - tail[1] == 2 && head[0] != tail[0]) tail[0] = head[0]; // North
    if (head[0] - tail[0] == 2 && head[1] != tail[1]) tail[1] = head[1]; // East
    if (head[1] - tail[1] == -2 && head[0] != tail[0]) tail[0] = head[0]; // South
    if (head[0] - tail[0] == -2 && head[1] != tail[1]) tail[1] = head[1]; // West
    // Figure out where the tail needs to be
    if (head[1] - tail[1] == 2) tail[1] += 1; // North
    if (head[0] - tail[0] == 2) tail[0] += 1; // East
    if (head[1] - tail[1] == -2) tail[1] -= 1; // South
    if (head[0] - tail[0] == -2) tail[0] -= 1; // West
    // Add to visited
    visited.add(tail.toString());
  }
});

console.log(visited.size);