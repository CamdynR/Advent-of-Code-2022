const fs = require('fs');
let input = fs.readFileSync(__dirname + '/input-real.txt', {
  encoding: 'UTF-8',
});

// rock = A, X
// paper = B, Y
// scissors = C, Z

let totalScore = 0;
input.split('\n').forEach((match) => {
  let choices = match.split(' ');
  let outcome = 0;
  let choiceScore = 0;
  if (choices[1] == 'X' && choices[0] == 'A') outcome = 3;
  if (choices[1] == 'X' && choices[0] == 'C') outcome = 6;
  if (choices[1] == 'Y' && choices[0] == 'B') outcome = 3;
  if (choices[1] == 'Y' && choices[0] == 'A') outcome = 6;
  if (choices[1] == 'Z' && choices[0] == 'C') outcome = 3;
  if (choices[1] == 'Z' && choices[0] == 'B') outcome = 6;
  if (choices[1] == 'X') choiceScore += 1;
  if (choices[1] == 'Y') choiceScore += 2;
  if (choices[1] == 'Z') choiceScore += 3;
  totalScore += outcome + choiceScore;
});

console.log(totalScore);