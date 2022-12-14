const SETUP = { split: '\n', txt: 'real.txt' };
if (process.argv[2] == 'test') SETUP.txt = 'test.txt';
const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input-${SETUP.txt}`).toString();
input = input.replaceAll('\r', '');

let packets = input
  .split(SETUP.split + SETUP.split)
  .map((l) => l.split(SETUP.split).map((a) => JSON.parse(a)));
packets = packets.map((packet) => {
  return { left: packet[0], right: packet[1] };
});

function comparePacket(left, right, str) {
  str = str === undefined ? '' : str;
  // console.log(`${str}- Compare ${JSON.stringify(left)} vs ${JSON.stringify(right)}`)
  for (let i = 0; i < left.length; i++) {
    if (i >= right.length) return false;
    // console.log(`${str}  - Compare ${JSON.stringify(left[i])} vs ${JSON.stringify(right[i])}`)
    if (!Array.isArray(left[i]) && !Array.isArray(right[i])) {
      if (left[i] < right[i]) {
        // console.log(`${str}    - Left side is smaller, so inputs are in the *right* order`);
        return true;
      }
      if (left[i] > right[i]) {
        // console.log(`${str}    - Right side is smaller, so inputs are _not_ in the right order`);
        return false;
      }
    } else {
      let newLeft = left[i];
      let newRight = right[i];
      if (!Array.isArray(left[i]) && Array.isArray(right[i])) {
        newLeft = [left[i]];
        // console.log(`${str}    - Mixed types; convert left to ${JSON.stringify(newLeft)} and retry comparison`);
      }
      if (!Array.isArray(right[i]) && Array.isArray(left[i])) {
        newRight = [right[i]];
        // console.log(`${str}    - Mixed types; convert right to ${JSON.stringify(newRight)} and retry comparison`);
      }
      let comparison = comparePacket(newLeft, newRight, str+'    ');
      if (comparison === undefined) continue;
      if (comparison) return true;
      if (!comparison) return false;
    }
  }
  if (left.length < right.length) return true;
  if (left.length > right.length) return false;
}

let allPackets = [];
packets.forEach(p => allPackets.push(p.left, p.right));

allPackets = allPackets.sort((a,b) => {
  let comparison = comparePacket(a,b,'');
  return comparison ? -1 : 1;
});

let indexes = [];
allPackets.forEach((p,i) => {
  if (!Array.isArray(p)) return;
  if (p.length !== 1) return;
  if (!Array.isArray(p[0])) return;
  if (p[0].length !== 1) return;
  if (p[0][0] == 2 || p[0][0] == '2') indexes.push(i+1);
  if (p[0][0] == 6 || p[0][0] == '6') indexes.push(i+1);
});

console.log(`Decoder Key: ${indexes[0]*indexes[1]}`);
