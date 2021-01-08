#!/usr/bin/env node

const program = require('commander');
const version = require('./package.json').version;

program.name('emulatedcheck').usage('[check] <options...>');

program
    .version(version, '-v, --version', 'Output the current version.')
    .helpOption('-h, --help', 'Show this command summary.')
    .addHelpCommand(false);

program
    .command('check')
    .description('Perform emulated check to find passed js selector in passed website')
    .requiredOption('--url <url>','URL to check for js selector')
    .requiredOption('--selector <selector>','js selector to search for')
    .option('--count <count>','Amount of selector length equal or larger to compare','1')
    .option('-u, --auth-username <user>', 'Basic authentication username.')
    .option('-p, --auth-password <password>', 'Basic authentication password.')
    .action(async (config) => {
        let result = await require('./lib/check')(config)
        process.exit(result)
    })

program.parse(process.argv);