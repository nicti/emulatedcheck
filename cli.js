#!/usr/bin/env node

const program = require('commander');
const version = require('./package.json').version;

program.name('emulatedcheck').usage('[check] <options...>');

program
    .version(version, '--version', 'Output the current version.')
    .helpOption('-h, --help', 'Show this command summary.')
    .addHelpCommand(false);

function increaseVerbosity(dummyValue, previous) {
    return previous + 1;
}

program
    .command('check')
    .description('Perform emulated check to find passed js selector in passed website')
    .requiredOption('--url <url>','URL to check for js selector')
    .requiredOption('--selector <selector>','js selector to search for')
    .option('--count <count>','Amount of selector length equal or larger to compare','1')
    .option('--user-agent <user-agent>','User agent for puppeteer to pass')
    .option('-v, --verbose', 'verbosity that can be increased', increaseVerbosity, 0)
    .action(async (config) => {
        let result = await require('./lib/check')(config)
        let verbose = config.verbose
        if (typeof verbose === "undefined" || verbose === 1) {
            console.log(result.v)
        } else if (verbose && verbose >= 2) {
            console.log(result.vv)
        }
        process.exit(result.code)
    });

program.parse(process.argv);