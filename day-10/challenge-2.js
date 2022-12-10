const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input-real.txt`).toString();

// Format Input
input = input.split('\n').map(i => i.split(' '));
input.forEach((inst) => {
  if (inst[0] == 'addx') inst[1] = Number(inst[1]);
});

let X = 1;
let cycle = 0;
let picture = [];
let currRow = '';
while (input.length > 0) {
  let instruction = input.shift();
  // No Operation
  if (instruction[0] == 'noop') {
    cycle += 1;
    if (cycle % 40 >= X && cycle % 40 <= X+2) {
      currRow += '#';
    } else {
      currRow += '.';
    }
  // AddX
  } else {
    cycle += 1;
    if (cycle % 40 >= X && cycle % 40 <= X+2) {
      currRow += '#';
    } else {
      currRow += '.';
    }
    cycle += 1;
    if (cycle % 40 >= X && cycle % 40 <= X+2) {
      currRow += '#';
    } else {
      currRow += '.';
      if (cycle == 10) console.log(cycle, X);
    }
    X += instruction[1];
  }
  if (currRow.length >= 40) {
    picture.push(currRow.substring(0,40));
    let leftover = currRow.substring(40);
    currRow = leftover;
  }
}

console.log(picture.join('\n'));