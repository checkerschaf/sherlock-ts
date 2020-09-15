import chalk from 'chalk';
import {logger} from './logger';

export default class BeautifulOutputs {
    static sherlockTs(): void {
        logger.info(chalk`
          {cyan                                                                                ,_
  ███████╗██╗  ██╗███████╗██████╗ ██╗      ██████╗  ██████╗██╗  ██╗████████╗███████╗   ,'  \`\\,_
  ██╔════╝██║  ██║██╔════╝██╔══██╗██║     ██╔═══██╗██╔════╝██║ ██╔╝╚══██╔══╝██╔════╝   |_,-'_)
  ███████╗███████║█████╗  ██████╔╝██║     ██║   ██║██║     █████╔╝    ██║   ███████╗   /##c '\\  (
  ╚════██║██╔══██║██╔══╝  ██╔══██╗██║     ██║   ██║██║     ██╔═██╗    ██║   ╚════██║  ' |'  -{.  )
  ███████║██║  ██║███████╗██║  ██║███████╗╚██████╔╝╚██████╗██║  ██╗██╗██║   ███████║    /\\__-' \\[]
  ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═╝╚═╝   ╚══════╝    /\`-_\`\\
  }                          Made with {red <3} by {cyan checkerschaf}.                               {cyan '     \\  }

`);
    }

    static fatalError(err: Error): void {
        logger.debug(err);
        logger.error(chalk.red(`[!] Fatal error: ${err.message || err}`));
    }
}
