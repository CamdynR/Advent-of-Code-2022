const SETUP = { split: '\r\n', txt: 'real.txt' };
if (process.argv[3] == 'mac') SETUP.split = '\n';
if (process.argv[2] == 'test') SETUP.txt = 'test.txt';
const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input-${SETUP.txt}`).toString();

// Format input

input = input.split(SETUP.split).map((r) => r.split(''));

let start, end;
let visited = {};
for (let row = 0; row < input.length; row++) {
  for (let col = 0; col < input[row].length; col++) {
    visited[`${row},${col}`] = false;
    if (input[row][col] == 'S') {
      start = [row, col];
      input[row][col] = 'a';
    } else if (input[row][col] == 'E') {
      end = [row, col];
      input[row][col] = 'z';
    }
  }
}

let finalPath;
let shortestPath = Infinity;
let queue = [[start]];
while (queue.length > 0) {
  let path = queue.shift();
  let curr = path.at(-1);
  if (curr[0] === end[0] && curr[1] === end[1] && path.length < shortestPath) {
    shortestPath = path.length;
    finalPath = path;
  }
  if (visited[curr.toString()]) continue;
  visited[curr.toString()] = true;
  let dirRow, dirCol, dirCode;
  let currCode = input[curr[0]][curr[1]].charCodeAt(0);
  // North, South, West, East
  if (curr[0] > 0) {
    [dirRow, dirCol] = [curr[0] - 1, curr[1]];
    dirCode = input[dirRow][dirCol].charCodeAt(0);
    if (dirCode <= currCode + 1) queue.push([...path, [dirRow, dirCol]]);
  }
  if (curr[0] < input.length - 1) {
    [dirRow, dirCol] = [curr[0] + 1, curr[1]];
    dirCode = input[dirRow][dirCol].charCodeAt(0);
    if (dirCode <= currCode + 1) queue.push([...path, [dirRow, dirCol]]);
  }
  if (curr[1] > 0) {
    [dirRow, dirCol] = [curr[0], curr[1] - 1];
    dirCode = input[dirRow][dirCol].charCodeAt(0);
    if (dirCode <= currCode + 1) queue.push([...path, [dirRow, dirCol]]);
  }
  if (curr[1] < input[curr[0]].length - 1) {
    [dirRow, dirCol] = [curr[0], curr[1] + 1];
    dirCode = input[dirRow][dirCol].charCodeAt(0);
    if (dirCode <= currCode + 1) queue.push([...path, [dirRow, dirCol]]);
  }
}

let grid = [];
for (let row = 0; row < input.length; row++) {
  grid.push([]);
  for (let col = 0; col < input[row].length; col++) {
    grid[row].push('.');
  }
}
// final
for (let i = 0; i < finalPath.length - 1; i++) {
  // North
  if (finalPath[i + 1][0] < finalPath[i][0]) {
    grid[finalPath[i][0]][finalPath[i][1]] = '^';
  }
  // South
  if (finalPath[i + 1][0] > finalPath[i][0]) {
    grid[finalPath[i][0]][finalPath[i][1]] = 'v';
  }
  // East
  if (finalPath[i + 1][1] > finalPath[i][1]) {
    grid[finalPath[i][0]][finalPath[i][1]] = '>';
  }
  // West
  if (finalPath[i + 1][1] < finalPath[i][1]) {
    grid[finalPath[i][0]][finalPath[i][1]] = '<';
  }
}
grid[end[0]][end[1]] = 'E';

console.log(grid.map((r) => r.join('')).join('\n'));

console.log(`\nShortest Path Length: ${finalPath.length - 1}`);
