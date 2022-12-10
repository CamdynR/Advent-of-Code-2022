const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input-real.txt`).toString();

// Format Input
input = input.split('\n').map(i => i.split(' '));
input.forEach((inst) => {
  if (inst[0] == 'addx') inst[1] = Number(inst[1]);
});

let X = 1;
let cycle = 0;
let signalStrength = [];
while (input.length > 0) {
  let instruction = input.shift();
  // No Operation
  if (instruction[0] == 'noop') {
    cycle += 1;
    if (cycle == (20 + (40 * signalStrength.length))) {
      signalStrength.push(cycle * X);
    }
  // AddX
  } else {
    cycle += 1;
    if (cycle == (20 + (40 * signalStrength.length))) {
      signalStrength.push(cycle * X);
    }
    cycle += 1;
    if (cycle == (20 + (40 * signalStrength.length))) {
      signalStrength.push(cycle * X);
    }
    X += instruction[1];
  }
  if (signalStrength.length == 6) break;
}

console.log(`Signal Strength Sum: ${signalStrength.reduce((a,b) => a+b)}`);