#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

fs.readFile(path.join(__dirname, 'bundle.js'), 'utf8', (err, data) => {
  assert(!err, err);

  const addInit = 'const init = ' + data;
  const pos = addInit.lastIndexOf('()');
  const removeIife = addInit.substring(0, pos) + addInit.substring(pos + 2);

  fs.writeFile(path.join(__dirname, 'bundle_init.js'), removeIife, (err1) => {
    assert(!err1, err1);
  });
});
