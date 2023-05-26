// import getConfig from 'next/config';
// import path from 'path';
import { NotificationMessages } from './NotificationMessages';
import { ValidationMessages } from './ValidationMessages';
// console.log('path', path);
// const { publicRuntimeConfig } = getConfig();

// const fs = require('fs')
// let Labels = JSON.parse(fs.readFileSync('../../../static/lang/hi.json', 'utf-8'))

// import Labels from `${publicRuntimeConfig.staticFolder}/lang/hi.json`;
// const Labels = require(`${publicRuntimeConfig.staticFolder}/lang/hi.json`);
// const Labels = require('../../../static/lang/hi.json');
let Labels = '';
if (typeof window !== 'undefined') {
    if(window.localStorage.getItem('appLang-hi')){
        Labels = JSON.parse(window.localStorage.getItem('appLang-hi'));
    }else {
        Labels = require('./Labels.json');
    }
} 

export const hindi = {
    validationMessages: { ...ValidationMessages },
    labels: { ...Labels },
    notificationMessages: { ...NotificationMessages }
};
