import { Browser } from 'puppeteer';

let myBrowser: Browser | undefined = undefined;

// referent current browser, initial by wa-client
export function browser(browser?: Browser): Browser {
    if (! myBrowser) {
        myBrowser = browser;        
    }

    // @ts-ignore
    return myBrowser;
}