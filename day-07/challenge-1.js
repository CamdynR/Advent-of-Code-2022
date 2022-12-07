const fs = require('fs');
let input = fs.readFileSync(`${__dirname}/input-real.txt`).toString();
const TARGET_SIZE = 100000;

class File {
  constructor (size, name) {
    let err = '';
    if (name === undefined) err += 'Name';
    if (size === undefined) err = err == 'Name' ? 'Name and Size' : 'Size';
    if (err !== '') throw new Error(err + ' missing from File constructor');

    this.name = name;
    this.size = size;
    this.parent = null;
  }
  toString() {
    return `- ${this.name} (file, size=${this.size})`;
  }
}

class Directory {
  constructor(name) {
    if (name === undefined) {
      throw new Error('Name missing from File constructor');
    }
    this.size = 0;
    this.files = [];
    this.directories = [];
    this.name = name;
    this.parent = null;
  }
  addFile(file) {
    if (!(file instanceof File)) {
      throw new Error('addFile() parameter must be instance of File');
    }
    file.parent = this;
    this.size += file.size;
    this.files.push(file);
    if (this.parent !== null) this.parent.addSize(file.size);
  }
  addDirectory(directory) {
    if (!(directory instanceof Directory)) {
      throw new Error('addDirectory() parameter must be instance of Directory');
    }
    directory.parent = this;
    this.directories.push(directory);
  }
  addSize(size) {
    this.size += size;
    if (this.parent !== null) this.parent.addSize(size);
  }
  toString(spaceNum) {
    if (!spaceNum) spaceNum = 0;
    let space = new Array(spaceNum).fill(' ').join('');
    let str = space+`- ${this.name} (dir, size=${this.size})\n`;
    this.files.forEach((file) => str += space+`  ${file.toString()}\n`);
    this.directories.forEach((dir) => str += dir.toString(spaceNum+2));
    return str;
  }
}

// Create the directory structure
input = input.split('\n').map(l => l.split(' '));
let computer = new Directory('/');
let currDir = computer;
for (let i = 1; i < input.length; i++) {
  // List directories
  if (input[i][1] == 'ls' && currDir.directories.length == 0) {
    i += 1;
    while (i < input.length && input[i][0] != '$') {
      if (input[i][0] == 'dir') {
        currDir.addDirectory(new Directory(input[i][1]));
      } else {
        currDir.addFile(new File(Number(input[i][0]), input[i][1]));
      }
      i += 1;
    }
  }
  // Change directories
  if (i < input.length && input[i][1] == 'cd') {
    let newDir;
    if (input[i][2] == '..') {
      newDir = currDir.parent;
      if (newDir == null) {
        console.error(input[i].join(' '));
        throw new Error(`Directory ${currDir.name} does not have a parent`);
      }
    } else {
      // Grab the new dir
      newDir = currDir.directories.filter(dir => dir.name == input[i][2]);
      // Check to make sure the new dir exists
      if (newDir.length == 0) {
        console.error(input[i].join(' '));
        throw new Error(`Directory ${input[i][2]} is not a child of ${currDir.name}`);
      } else {
        newDir = newDir.pop();
      }
    }
    // Set the currDir to the new dir
    currDir = newDir;
  }
}

// Search the directories
currDir = computer;
function bstDirectory(root) {
  let matches = [];
  if (root.size < TARGET_SIZE) matches.push(root.size);
  return [...matches, ...root.directories.map(d => bstDirectory(d)).flat(Infinity)];
}

// console.log(computer.toString())
console.log(`Directory Sum: ${bstDirectory(computer).reduce((a,b) => a+b)}`)