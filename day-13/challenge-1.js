const SETUP = { split: '\r\n', txt: 'real.txt' };
if (process.argv[3] == 'mac') SETUP.split = '\n';
if (process.argv[2] == 'test') SETUP.txt = 'test.txt';
const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input-${SETUP.txt}`).toString();

let packets = input.split(SETUP.split+SETUP.split).map(l => l.split(SETUP.split).map(a => eval(a)));
packets = packets.map(packet => { return { left: packet[0], right: packet[1] }})

function compareItem(leftItem, rightItem) {
  console.log(leftItem, rightItem)
  if (!Array.isArray(leftItem) && !Array.isArray(rightItem)) {
    if (leftItem == rightItem) return 'equal';
    return leftItem < rightItem;
  } else {
    if (!Array.isArray(leftItem)) leftItem = [leftItem];
    if (!Array.isArray(rightItem)) rightItem = [rightItem];
    return comparePacket(leftItem, rightItem);
  }
}

function comparePacket(left, right) {
  for (let i = 0; i < left.length; i++) {
    if (compareItem(left[i], right[i])) return true;
  }
  return left.length < right.length;
}

let inRightOrder = [];
packets.forEach((packet,i) => {
  if (comparePacket(packet.left, packet.right)) inRightOrder.push(i+1);
});

console.log(inRightOrder);
// console.log(`Right Order Sum: ${inRightOrder.reduce((a,b) => a + b)}`);