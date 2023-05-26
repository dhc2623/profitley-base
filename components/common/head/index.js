import Head from 'next/head';

const DocHead = ({ pageTitle = '' }) => {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
            />

            <meta name="description" content=" A simple and powerful App to automate and accelerate your business" />
            <meta name="keywords" content="Keywords" />
            <title>{pageTitle ? `${pageTitle} - ` : ''} Profitley - Cloud B2B Order Management Application</title>
            <link rel="manifest" href="/manifest.json" />
            <link href={'/favicon.ico'} rel="icon" sizes="16x16" />
            <meta name="theme-color" content="#317EFB" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
                rel="stylesheet"></link>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
            />
        </Head>
    );
};

export default DocHead;
