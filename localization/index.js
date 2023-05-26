import LocalizedStrings from 'react-localization';
import { english } from './languages/en';

let srcData = english;
if (typeof window !== 'undefined') {
    if(window.localStorage.getItem('appLang')){
        srcData = JSON.parse(window.localStorage.getItem('appLang'));
    }
} 

export const langs = new LocalizedStrings({
    en: srcData,
});

langs.setLanguage('en');
