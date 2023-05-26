import { Fragment } from 'react';
import Head from 'next/head';

const PrintButton = ({ uri }) => {
    const click = () => printJS(uri);
    return (<Fragment>
        <Head>
            <script src="https://printjs-4de6.kxcdn.com/print.min.js"></script>
            <link rel="stylesheet" type="text/css" href="https://printjs-4de6.kxcdn.com/print.min.css" />
        </Head>
        <a onClick={click}>printjs</a>
    </Fragment>
    )
}

export default PrintButton;
