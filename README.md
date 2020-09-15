# Sherlock.TS 🕵️ - search users across 300+ websites

<p align="center">
  <br>
  <img alt="Screenshot" src="https://github.com/checkerschaf/sherlock-ts/raw/master/screenshot.png" />
  <br><br>
</p>

Sherlock-TS is a remake of the original [sherlock](https://github.com/sdushantha/sherlock) written in Python by [sdushantha](https://github.com/sdushantha).

It's written in TypeScript because I wanted to test how to create a CLI in NodeJs + TypeScript that can be executed on Windows, MacOS and Linux 😊

#### Master-Branch Status
![Node.js CI](https://github.com/checkerschaf/sherlock-ts/workflows/Node.js%20CI/badge.svg?branch=master)

## How to use?

1. Simply down the executable for your system from the [latest release](https://github.com/checkerschaf/sherlock-ts/releases/latest).
2. Open the command line where your file is located. [Here](https://www.howtogeek.com/235101/10-ways-to-open-the-command-prompt-in-windows-10/#:~:text=Open%20Command%20Prompt%20from%20the,open%20an%20administrator%20Command%20Prompt.) is a tutorial if you aren't familiar with that.
3. Run the script by using:
    - Windows: `sherlockts-win.exe --username=JohnDoe`
    - Linux: `./sherlockts-linux --username=JohnDoe`
4. Done! 🎉 You now have a running version of Sherlock.TS on your machine.

*Tip: Of course you can rename the file to `sherlock` or whatever you want to.*

## Command Options


| Argument | Description |
|:-:|:-:|
| `--help` | Show help |
| `--version` | Show version number |
| `-n, -u, --name, --username` | Username to look for |
| `-m, --onlyMatching` | Only show matching results |
| `-t, --timeout` | Set timout for requests in ms |
| `-f, --format` | Select output format [json,pretty-json,csv] |

## How to contribute?

If you encounter any issues please create an issue [here](https://github.com/checkerschaf/sherlock-ts/issues) but please look for existing issues first before creating a new one 😉


## How to install the source code?

1. Clone the repository.
2. Run `npm run local-setup`

If you want to run a server for development run `npm start`. This will watch for changes and automatically restarts the script.

After running `npm run build` to compile the typescript files you can run `node build/index.js` as well.

### Useful development commands:
- `npm run lint` - Runs a code linter to look for check the code style.
- `npm test` - Runs all tests and creates a code coverage report.
- `npm run test-ci` - Runs linting, security audits and test as done be CI.
- `npm run pkg` - Create a local executable on you current system in the root directory.
