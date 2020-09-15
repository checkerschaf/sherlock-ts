import axios from 'axios';
import {ScannerResult} from './enums';

const checkUsernameAtUrl = async (url: URL, username: string, timeout = 10000): Promise<ScannerResult | Error> => {
    try {
        const response = await axios.get(url.toString(), {
            timeout,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36',
            },
        });
        const data = response?.data?.replace(/(<([^>]+)>)/ig, '');
        return pageContainsUsername(data, username)
            ? ScannerResult.SUCCESS
            : ScannerResult.NOT_FOUND;
    } catch (err) {
        if (err?.response?.status < 500 || err?.response?.status > 599) {
            return ScannerResult.NOT_FOUND;
        }
        return err.message;
    }
};

const pageContainsUsername = (data: string, username: string) => {
    return data.includes(username) && !data.includes('Not Found') && !data.includes('Not found') && !data.includes('exist');
};

process.on('message', msg => {
    const data = msg.split(' ');
    checkUsernameAtUrl(new URL(data[0]), data[1], data[2])
        .then(result => (<any>process).send(result))
        .finally(() => process.exit(0))
        .catch((err) => {
            throw new err;
        });
});
