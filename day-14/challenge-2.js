const fs = require('fs');
const SETUP = { split: '\n', txt: 'real.txt' };
if (process.argv[2] == 'test') SETUP.txt = 'test.txt';
let input = fs.readFileSync(`${__dirname}/input-${SETUP.txt}`).toString().replaceAll('\r', '');

