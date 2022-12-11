const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input-real.txt`).toString();

const NUM_ROUNDS = 20;

// Create the Monkey class
class Monkey {
  #items;
  #operation;
  #test;

  /**
   * @param {array<number>} items list of worry levels of items
   * @param {function} operation Function to call on each item as inspection occurs
   * @param {function} test Determines what monkey to throw to
   */
  constructor(items, operation, test) {
    this.#items = items;
    this.#operation = operation;
    this.#test = test;
    this.numInspections = 0;
  }

  /**
   * Applies the passed in operation and divides by 3
   * @param {number} old your worry level before inspection
   * @returns {number} new worry level
   */
  inspect(old) {
    this.numInspections += 1;
    return Math.floor(this.#operation(old) / 3);
  }

  /**
   * @return {object | false} Returns who to throw to and what
   *                          value, otherwise false
   */
  continueTurn() {
    if (this.#items.length == 0) return false;
    let worryVal = this.inspect(this.#items.shift())
    return { monkey: this.#test(worryVal), val: worryVal };
  }

  /**
   * Add an item to items list
   * @param {number} item worry level of an item
   */
  addItem(item) {
    this.#items.push(item);
  }

  get items() {
    return this.#items;
  }
}

// Format the input
input = input.split('Monkey ').filter(m => m !== '');
input = input.map(monkey => monkey.split('\n'));
input = input.map(monkey => {
  // Get items
  let items = monkey[1].split('  Starting items: ')[1];
  items = items.split(', ').map(i => Number(i));
  // Get the operation function
  let operation = monkey[2].split('  Operation: new = old ')[1];
  operation = operation.split(' ');
  let [sign, opNum] = operation;
  opNum = Number(opNum);
  operation = (old) => {
    if (sign == '+' && !isNaN(Number(opNum))) return old + opNum;
    if (sign == '*' && !isNaN(Number(opNum))) return old * opNum;
    if (sign == '+') return old + old;
    if (sign == '*') return old * old;
  }
  // Get the testing function
  let divisor = monkey[3].split('  Test: divisible by ');
  divisor = Number(divisor.pop());
  let trueMonkey = Number(monkey[4].split(' ').pop());
  let falseMonkey = Number(monkey[5].split(' ').pop());
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

// Execute the rounds
for (let i = 0; i < NUM_ROUNDS; i++) {
  for (let j = 0; j < monkeys.length; j++) {
    let currMonkey = monkeys[j];
    let nextThrow = currMonkey.continueTurn();
    while (typeof nextThrow == 'object') {
      monkeys[nextThrow.monkey].addItem(nextThrow.val);
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