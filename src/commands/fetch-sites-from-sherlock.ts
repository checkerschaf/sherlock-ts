import axios from 'axios';
import fs from 'fs';
import {logger} from '../logger';

interface Site {
    [key: string]: string;
}

const getSites = async (url: string): Promise<Site> => {
    const response = await axios.get(url);
    const sites: Site = {};
    for (const site in response.data) {
        sites[site] = response.data[site].url;
    }
    return sites;
};

getSites('https://raw.githubusercontent.com/sherlock-project/sherlock/master/sherlock/resources/data.json')
    .then((sites) => {
        console.log(sites);
        fs.writeFileSync('./src/sites.json', JSON.stringify(sites, null, 4));
        logger.info(`Successfully written ${sites.length} to src/sites.json`);
    })
    .catch(err => console.error(err));
