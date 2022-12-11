const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input-real.txt`).toString();

const NUM_ROUNDS = 10000;

// Create the Monkey class
class Monkey {
  /**
   * @param {array<number>} items list of worry levels of items
   * @param {function} operation Function to call on each item as inspection occurs
   * @param {function} test Determines what monkey to throw to
   */
  constructor(items, operation, test) {
    this.items = items;
    this.operation = operation;
    this.test = test;
    this.numInspections = 0;
  }

  /**
   * Applies the passed in operation and divides by 3
   * @param {number} old your worry level before inspection
   * @returns {number} new worry level
   */
  inspect(old) {
    this.numInspections += 1;
    return this.operation(old);
  }

  /**
   * @return {object | false} Returns who to throw to and what
   *                          value, otherwise false
   */
  continueTurn() {
    if (this.items.length == 0) return false;
    let worryVal = this.inspect(this.items.shift())
    return { monkey: this.test(worryVal), val: worryVal };
  }
}

// Format the input
input = input.split('Monkey ').filter(m => m !== '');
input = input.map(monkey => monkey.split('\n'));
let divisorList = [];
input = input.map(monkey => {
  // Get items
  let items = monkey[1].split('  Starting items: ')[1];
  items = items.split(', ').map(i => Number(i));
  // Get the testing function
  let divisor = monkey[3].split('  Test: divisible by ');
  divisor = Number(divisor.pop());
  divisorList.push(divisor);
  let trueMonkey = Number(monkey[4].split(' ').pop());
  let falseMonkey = Number(monkey[5].split(' ').pop());
  // Get the operation function
  let operation = monkey[2].split('  Operation: new = old ')[1];
  operation = operation.split(' ');
  let [sign, opNum] = operation;
  if (opNum == 'old') {
    if (sign == '+') operation = (old) => old+old;
    if (sign == '*') operation = (old) => old*old;
  } else {
    opNum = Number(opNum);
    if (sign == '+') operation = (old) => old+opNum;
    if (sign == '*') operation = (old) => old*opNum;
  }
  test = (val) => {
    if (val % divisor === 0) return trueMonkey;
    return falseMonkey;
  }
  // Return everything wrapped up in an object
  return {
    items: items,
    operation: operation,
    test: test
  };
});
let monkeys = input.map(m => new Monkey(m.items, m.operation, m.test));
let mod = divisorList.reduce((a,b) => a*b);
Monkey.prototype.continueTurn = function continueTurn() {
  if (this.items.length == 0) return false;
  let worryVal = this.inspect(this.items.shift()) % mod;
  return { monkey: this.test(worryVal), val: worryVal };
}

// Execute the rounds
for (let i = 0; i < NUM_ROUNDS; i++) {
  for (let j = 0; j < monkeys.length; j++) {
    let currMonkey = monkeys[j];
    let nextThrow = currMonkey.continueTurn();
    while (typeof nextThrow == 'object') {
      monkeys[nextThrow.monkey].items.push(nextThrow.val);
      nextThrow = currMonkey.continueTurn();
    }
  }
}

// Print the monkeys items
let counts = monkeys.map(m => m.numInspections).sort((a,b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
});

console.log(`Monkey Business Level: ${counts.pop() * counts.pop()}`);