import { parseCookies } from '../../helper/AuthActions';

export default async (req, res) => {
    try {
        const cookies = await parseCookies(req);
        let backEndUrl = '';
        if (!cookies.beHostname) {
            let url =
                req.headers.host !== 'localhost:3000'
                    ? req.headers.host
                    : 'https://demo.profitley.com';
            backEndUrl = url.replace('.profitley', '-be.profitley');
        } else {
            backEndUrl = `https://${cookies.beHostname}`;
        }
        const url = `${backEndUrl}/api/v1/get-language/${req.query.preferredLanguage}`;
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        console.log(data);
        const dataJson = await data.json();
        res.json(dataJson.success);
    } catch (error) {
        console.log(error);
    }
};
