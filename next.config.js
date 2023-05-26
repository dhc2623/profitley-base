/* eslint-disable */
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
const withPWA = require('next-pwa');

module.exports =
    withPWA({
        pwa: {
            disable: process.env.NODE_ENV === 'development',
             dest: 'public',
            register: true,

        },
        // ...
        // withCss({
            env: {
                BACKEND_URL: process.env.BACKEND_URL,
                FRONTEND_URL: process.env.FRONTEND_URL,
                debugging: process.env.debugging
            },
            // experimental: { css: true },
            // reactStrictMode: true,
            // cssModules: true,
            images: {
                domains: ['demo-be.profitley.com',
                'amberauto-be.profitley.com', 
                'etna-be.profitley.com', 
                'rajiv-be.profitley.com', 
                'voratraders-be.profitley.com', 
                'etnamotors-be.profitley.com', 
                'mfg-be.profitley.com',
                'srisrient-be.profitley.com',
                'aetradelinks-be.profitley.com',
                'qa-be.profitley.com', 
                '10.10.10.179', 
                process.env.BACKEND_URL]
            },
            ...withLess({
                lessLoaderOptions: {
                    javascriptEnabled: true
                },
                webpack: (config, { isServer }) => {
                    if (isServer) {
                        const antStyles = /antd\/.*?\/style.*?/;
                        const origExternals = [...config.externals];
                        config.externals = [
                            (context, request, callback) => {
                                if (request.match(antStyles)) return callback();
                                if (typeof origExternals[0] === 'function') {
                                    origExternals[0](context, request, callback);
                                } else {
                                    callback();
                                }
                            },
                            ...(typeof origExternals[0] === 'function' ? [] : origExternals)
                        ];

                        config.module.rules.unshift({
                            test: antStyles,
                            use: 'null-loader'
                        });

                    }
                    // if (config.optimization.splitChunks) {
                    //     config.optimization.splitChunks.cacheGroups.shared.enforce = true;
                    // }
                    return config;
                }
            })
        // })
    });
// });


