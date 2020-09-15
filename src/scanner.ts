import {OutputFormat, ScannerResult} from './enums';
import chalk from 'chalk';
import {fork} from 'child_process';
import sites from './sites.json';
import Timer from './lib/timer';

type ScannerOptions = {
    username: string;
    onlyMatching?: boolean;
    realtimeOutput?: boolean;
    timeout?: number;
    format?: OutputFormat|string;
};

type SiteResult = {
    site: string;
    url: string;
    result: ScannerResult;
    error?: string;
};

export default class Scanner {
    options: ScannerOptions;
    results: Array<SiteResult> = new Array<SiteResult>();

    constructor(options: ScannerOptions) {
        this.options = options;
    }

    async scan(): Promise<void> {
        this.verifyUsername();

        Object.keys(sites).forEach(site => {
            const url = sites[site].replace('{}', this.options.username);

            const worker = fork('./build/worker.js');
            worker.on('message', (result: ScannerResult | string) => {
                // This is neccessary due to message events being sent for compiling files
                if ((<any>result).compile) return;

                const siteResult: SiteResult = {
                    site,
                    url,
                    result: ScannerResult.ERROR,
                };

                switch (result) {
                    case ScannerResult.SUCCESS:
                    case ScannerResult.NOT_FOUND:
                        siteResult.result = result;
                        break;
                    default:
                        siteResult.result = ScannerResult.ERROR;
                        siteResult.error = result;
                }

                this.results.push(siteResult);
                this.outputSiteResult(siteResult);
            });
            worker.send(`${url} ${this.options.username} ${this.options.timeout}`);
        });
    }

    verifyUsername(): void {
        if (!String(this.options.username).match(/^[^ /&?]+$/g)) {
            throw new Error('Username contains invalid characters. Stopping.');
        }
    }

    outputSiteResult(siteResult: SiteResult): void {
        switch (siteResult.result) {
            case ScannerResult.SUCCESS:
                if (this.options.realtimeOutput) {
                    console.log(chalk`{bold [{green ✓}] {green ${siteResult.site}: }${siteResult.url}}`);
                }

                break;
            case ScannerResult.NOT_FOUND:
                if (this.options.realtimeOutput && !this.options.onlyMatching) {
                    console.log(chalk`{bold [{red -}] {gray ${siteResult.site}}}`);
                }

                break;
            default:
                if (this.options.realtimeOutput && !this.options.onlyMatching) {
                    console.log(chalk`{bold [{red -}] {red ${siteResult.site}: }${siteResult.error}}`);
                }
        }
    }

    outputTotalResults(): void {
        if (this.options.realtimeOutput) {
            console.log(chalk.green(`\nFinished in ${Timer.end()}ms.`));
            console.log(chalk`{green Found a total of {bold ${this.getTotalMatches()} matches} across {bold ${Object.keys(sites).length}} sites.}`);
            return;
        }

        // Export in different formats
        switch (this.options.format) {
            case OutputFormat.JSON:
                console.log(JSON.stringify(this.results));
                break;
            case OutputFormat.PRETTY_JSON:
                console.log(JSON.stringify(this.results, null, 4));
                break;
            case OutputFormat.CSV:
                console.log('site,url,result,error');
                for (const site of this.results) {
                    console.log(`${site.site},${site.url},${site.result},${site.error ?? 'null'}`);
                }
                break;
        }
    }

    getTotalMatches(): number {
        return this.results
            .filter((siteResult) => (siteResult.result === ScannerResult.SUCCESS))
            .length;
    }
}
