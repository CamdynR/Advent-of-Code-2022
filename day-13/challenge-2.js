const SETUP = { split: '\r\n', txt: 'real.txt' };
if (process.argv[3] == 'mac') SETUP.split = '\n';
if (process.argv[2] == 'test') SETUP.txt = 'test.txt';
const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input-${SETUP.txt}`).toString();
