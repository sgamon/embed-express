#!/usr/bin/env node

'use strict'

let child_process = require('child_process');
let fs = require('fs');

let fn = {
  'prompt for package.json file if missing': function () {
    if (!fs.existsSync('./package.json')) {
      console.log(`
    ERROR: missing package.json
    
    Create package.json using "npm init", then run this command again.
  `);
      process.exit(1)
    }
  },

  'prompt for server.js file if it exists': function () {
    if (fs.existsSync('./server.js')) {
      console.log(`\`
    ERROR: server.js already exists
    
    Remove the existing server.js file, then run this command again.
  `)
      process.exit(1)
    }
  },

  'install dependencies': function () {
    child_process.execSync('npm install --save express open')
  },

  'create server.js file': function () {
    fs.writeFileSync('./server.js', `
// A very minimal express server.

let express = require('express')
let open = require('open')

const PORT = process.env.PORT || 3001

express()
  .set('port', PORT)
  .use('/', express.static(__dirname))
  .listen(PORT, function() {
    console.log(\`Server started: http://localhost:\${PORT}/\`)
  })

open(\`http://localhost:\${PORT}/\`)
`)
  },

  'create index.html if needed': function () {
    if (!fs.existsSync('./index.html')) {
      fs.writeFileSync('./index.html', `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
`)
    }
  },

  'print message': function () {
    console.log(`
  Express server embedded. Use "node server" to run.
`)
  },
};

// -----------------------------------------------------

[
  'prompt for package.json file if missing',
  'prompt for server.js file if it exists',
  'install dependencies',
  'create server.js file',
  'create index.html if needed',
  'print message',
].forEach(step => fn[step]())

