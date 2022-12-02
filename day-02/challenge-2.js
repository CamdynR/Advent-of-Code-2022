const fs = require('fs');
let input = fs.readFileSync(__dirname + '/input-real.txt', {
  encoding: 'UTF-8',
});

let totalScore = 0;
input.split('\n').forEach((match) => {
  let choices = match.split(' ');
  let outcome, choiceScore;
  // If I need to lose
  if (choices[1] == 'X') {
    outcome = 0;
    if (choices[0] == 'A') choiceScore = 3;
    if (choices[0] == 'B') choiceScore = 1;
    if (choices[0] == 'C') choiceScore = 2;
  }
  // If I need to draw
  if (choices[1] == 'Y') {
    outcome = 3;
    if (choices[0] == 'A') choiceScore = 1;
    if (choices[0] == 'B') choiceScore = 2;
    if (choices[0] == 'C') choiceScore = 3;
  }
  // If I need to win
  if (choices[1] == 'Z') {
    outcome = 6;
    if (choices[0] == 'A') choiceScore = 2;
    if (choices[0] == 'B') choiceScore = 3;
    if (choices[0] == 'C') choiceScore = 1;
  }
  totalScore += outcome + choiceScore;
});

console.log(totalScore);