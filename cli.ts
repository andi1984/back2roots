#!/usr/bin/env node

const [, , ...args] = process.argv;
const build = require('./build');
build();