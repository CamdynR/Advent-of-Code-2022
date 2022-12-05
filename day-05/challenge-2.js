const fs = require('fs');
let input = fs.readFileSync(__dirname + '/input-real.txt', {
  encoding: 'UTF-8',
});

// Format input
input = input.split('\n').map(line => {
  if (line.startsWith('   ')) line = line.replace('   ', '___');
  if (line.endsWith('   ')) line = line.slice(0, -3) + '___';
  line = line.replaceAll('    ', ' ___');
  return line;
})
let rows = input.map((str) => str.split(' ').map(c => c.charAt(1)));
rows = rows.splice(0,8).reverse();
let stacks = [];
for (let i = 0; i < rows[0].length; i++) {
  stacks.push([...rows.map(row => row[i])].filter(c => c != '_'));
}
input = input.splice(2).map(instruction => {
  return instruction.split(' ').filter((a,i) => i%2 == 1).map((a) => Number(a));
});
input = input.splice(8);
input.pop();

// Follow the instructions
input.forEach((instruction, k) => {
  let toMove = [];
  for (let i = 0; i < instruction[0]; i++) {;
    toMove.unshift(stacks[instruction[1]-1].pop());
  };
  stacks[instruction[2]-1].push(...toMove)
});

console.log('Top of each stack:')
let finalStr = '';
for (let i = 0; i < stacks.length; i++) {
  finalStr += `[${stacks[i].pop()}]`;
  if (i < stacks.length-1) finalStr += ' ';
}
console.log(finalStr);
