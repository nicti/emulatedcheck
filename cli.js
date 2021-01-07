#!/usr/bin/env node

const program = require('commander');
const version = require('./package.json').version;

program.name('emulatedcheck').usage('[check] <options...>');

program
    .version(version, '-v, --version', 'Output the current version.')
    .helpOption('-h, --help', 'Show this command summary.')
    .addHelpCommand(false);

program.parse(process.argv);