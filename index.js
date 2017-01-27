#!/usr/bin/env node

'use strict';

let child_process = require('child_process')
let fs = require('fs');

if (!fs.existsSync('./package.json')) {
  console.log(`
    ERROR: missing package.json
    
    Create package.json using "npm init", then run this command again.
  `);
  process.exit(1);
}

if (fs.existsSync('./server.js')) {
  console.log(`\`
    ERROR: server.js already exists
    
    Remove the existing server.js file, then run this command again.
  `);
  process.exit(1);
}

child_process.execSync('npm install --save express open');

let serverjs = `
// A very minimal express server.

let express = require('express');
let open = require('open');


const PORT = 3001;

express()
  .set('port', PORT)
  .use('/', express.static(__dirname))
  .listen(PORT, function() {
    console.log(\`Server started: http://localhost:\${PORT}/\`);
  });

open(\`http://localhost:\${PORT}/\`);
`;

fs.writeFileSync('./server.js', serverjs);


if (!fs.existsSync('./index.html')) {
  let html = `
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>Hello World!</title>
</head>

<body>
  <h1>Hello World!</h1>
</body>
</html>

`;

  fs.writeFileSync('./index.html', html);
}


console.log(`
  Express server embedded. Use "node server" to run.
`);