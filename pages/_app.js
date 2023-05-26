import { Alert, Layout } from 'antd';
import Cookies from 'js-cookie';

// import { askForPermissioToReceiveNotifications } from '../config/FIrebasePushNotification';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import NextNprogress from 'nextjs-progressbar';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import UserContextProvider from '../contexts/userContext';
import { isUserLoggedIn } from '../helper/AuthActions';
import useNetworkStatus from '../hooks/useNetworkStatus';
import configureStore from '../store/Configure';
import '../styles/antd.less';
const Footer = dynamic(() => import('../components/common/footer/Footer'));
const DocHead = dynamic(() => import('../components/common/head'));
const SelectBuyer = dynamic(() => import('../components/cart/select-buyer-toggle/SelectBuyer'));
// const SelectSeller = dynamic(() => import('../components/select-seller-toggle'));
const AppHeader = dynamic(() => import('../components/common/header/Header'));
const NoInternet = dynamic(() => import('../components/network/noInternet'));

const { Content } = Layout;
const store = configureStore();

function MyApp(Props) {
    const { Component, pageProps } = Props;
    const router = useRouter();
    const networkStatus = useNetworkStatus();

    useEffect(() => {
        let url =
            window.location.hostname !== 'localhost'
                ? window.location.hostname
                : 'demo.profitley.com';
        const backEndUrl = url.replace('.profitley', '-be.profitley');
        Cookies.set('beHostname', backEndUrl, { expires: 365 });
        Cookies.set('feHostname', url, { expires: 365 });
    });

    const setNtworkStatus = networkStatus == undefined ? true : networkStatus;

    return (
        <Provider store={store}>
            <DocHead />
            {setNtworkStatus ? '' : <NoInternet />}
            <NextNprogress color="#29D" startPosition={0.3} stopDelayMs={200} height="3" />
            {isUserLoggedIn() ? (
                <UserContextProvider>
                    <AppHeader />
                    <Layout className="layout">
                        <Layout>
                            <Content className={`site-layout main-layout`}>
                                <Component {...pageProps} />
                            </Content>
                        </Layout>
                        <Footer />
                        <SelectBuyer />
                    </Layout>
                </UserContextProvider>
            ) : (
                <Layout className="layout">
                    <Layout>
                        {router.query.password_updated && (
                            <Alert
                                description={
                                    <div className="password-updated-alert">
                                        Your password has been changed successfully! You can now
                                        login to your account with the new password
                                    </div>
                                }
                                type="success"
                            />
                        )}
                        <Content className={`site-layout main-layout`}>
                            <Component {...pageProps} />
                        </Content>
                    </Layout>
                </Layout>
            )}
        </Provider>
    );
}
// MyApp.getInitialProps = async ({ Component, ctx }) => {
//     let pageProps = {};
//     let json = {}
//     try {
//       json = await fetch('http://localhost:3000/api/local');
//       // json = json.body
//     } catch (error) {
//         console.error(error);
//     }

//     // var request = require('request');
//     // request('https://qa-be.profitley.com/lang/hi.json', function (error, response, body) {
//     //   if (!error && response.statusCode == 200) {
//     //      var importedJSON = JSON.parse(body);
//     //      console.log(importedJSON);
//     //   }
//     // })

//     if (Component.getInitialProps) {
//         pageProps = await Component.getInitialProps(ctx);
//     }
//     return { pageProps, json };
// };

// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//     console.log('appContext----b', appContext)
//     return {
//         redirect: {
//           permanent: false,
//           destination: "/login"
//         }
//       }
//   return { ...appProps }
// }
export default MyApp;
