#!/usr/bin/env node
'use strict';
const importLocal = require('..');

let localFile = importLocal(__filename);
if (localFile) {
	console.log('local');
}
