#!/usr/bin/env node

/*
Search for the compact compiler on your operating system
*/

const childProcess = require('child_process');
const path = require('path');

const [_node, _script, ...args] = process.argv;
const COMPACT_HOME_ENV = process.env.COMPACT_HOME;

let compactPath;
if (COMPACT_HOME_ENV != null) {
  compactPath = COMPACT_HOME_ENV;
  console.log(`COMPACT_HOME env variable is set; using Compact from ${compactPath}`);
} else {
  compactPath = path.resolve(__dirname, '..', 'compact');
  console.log(`COMPACT_HOME env variable is not set; using fetched compact from ${compactPath}`);
}

// Debug: Print the full path to compact and zkir
console.log(`compact path: ${path.resolve(compactPath, 'compact')}`);
console.log(`zkir path: ${path.resolve(compactPath, 'zkir')}`);

// yarn runs everything with node...
const child = childProcess.spawn(path.resolve(compactPath, 'compact'), args, {
  stdio: 'inherit'
});
child.on('exit', (code, signal) => {
  if (code === 0) {
    process.exit(0);
  } else {
    process.exit(code ?? signal);
  }
});