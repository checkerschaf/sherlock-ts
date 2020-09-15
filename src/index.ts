import * as yargs from 'yargs';
import BeautifulOutputs from './beautiful-outputs';
import chalk from 'chalk';
import {OutputFormat} from './enums';
import Scanner from './scanner';
import Timer from './lib/timer';

// Setup beatiful exception handling
process.on('uncaughtException', (err) => BeautifulOutputs.fatalError(err));
process.on('unhandledRejection', () => BeautifulOutputs.fatalError(new Error('Unhandled Rejection')));

// Start a timer and show a beatiful Sherlock.ts ASCII image
Timer.start();
BeautifulOutputs.sherlockTs();

// Get command line arguments
const argv = yargs.options({
    name: {
        alias: ['n', 'u', 'username',],
        description: 'Username to look for',
        demandOption: true,
        type: 'string',
    },
    onlyMatching: {
        alias: 'm',
        description: 'Only show matching results',
        type: 'boolean',
    },
    timeout: {
        alias: 't',
        description: 'Set timout for requests in ms',
        type: 'number',
        default: 100000,
    },
    format: {
        description: 'Select output format',
        type: 'string',
        alias: 'f',
        choices: Object.keys(OutputFormat),
    },
})
    .epilogue(chalk`📖 {cyan For more details please visit} {underline.blue https://github.com/checkerschaf/sherlock-ts}`)
    .example(chalk`{yellow sherlockts -n=JohnDoe}`, 'Search for JohnDoe')
    .example(chalk`{yellow sherlockts -n=JohnDoe -m}`, 'Search for JohnDoe and only show matches')
    .argv;

const realtimeOutput = !argv.format;

// Create a new scanner with the arguments from the command line
const scanner = new Scanner({
    username: argv.name,
    onlyMatching: argv.onlyMatching,
    realtimeOutput,
    timeout: argv.timeout,
    format: argv.format,
});

// Add final output before exiting the process
process.on('exit', () => {
    scanner.outputTotalResults();
});

// Start the scan and wait for it to finish
scanner.scan()
    .catch(
        (err: Error) => BeautifulOutputs.fatalError(err)
    );
