const puppeteer = require('puppeteer');

let browser;
let page;

describe('Gumtree()', () => {
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            slowMo: 0,
        });
    });

    afterAll(() => {
        browser.close();
    });

    describe('AdSense()', () => {
        beforeEach(async () => {
            page = await browser.newPage();
        });

        test('call AdSense server', async () => {
            await page.setRequestInterception(true);
            let isAdSenseCalled = false;
            page.on('request', interceptedRequest => {
                if (interceptedRequest.url().includes('/afs/ads')) {
                    isAdSenseCalled = true;
                    // const [domain, queryParams] = interceptedRequest.url().split('?');
                    // const queryParamsArray = queryParams.split('&');
                    // console.log((queryParamsArray))
                    interceptedRequest.abort();
                } else {
                    interceptedRequest.continue();
                }
            });

            await page.goto('https://www.gumtree.com/for-sale', {waitUntil: 'domcontentloaded'});
            expect(isAdSenseCalled).toBe(true);
        });

        test('call AdSense server', async () => {
            await page.setRequestInterception(true);
            let isAdSenseCalled = false;
            page.on('request', interceptedRequest => {
                if (interceptedRequest.url().includes('/afs/ads')) {
                    isAdSenseCalled = true;
                    // const [domain, queryParams] = interceptedRequest.url().split('?');
                    // const queryParamsArray = queryParams.split('&');
                    // console.log((queryParamsArray))
                    interceptedRequest.abort();
                } else {
                    interceptedRequest.continue();
                }
            });

            await page.goto('https://www.gumtree.com/for-sale', {waitUntil: 'domcontentloaded'});

            expect(isAdSenseCalled).toBe(true);
        }, 20000);
    });

    describe('prebid()', () => {
        beforeEach(async () => {
            page = await browser.newPage();
        });

        test('prebid version on homepage', async () => {
            await page.goto('https://www.gumtree.com/', {waitUntil: 'domcontentloaded'});

            const prebidVersion = await page.evaluate(`pbjs.version`);
            expect(prebidVersion).toBe('v1.14.0');
        });

        test('prebid version on for-sale page', async () => {
            await page.goto('https://www.gumtree.com/for-sale', {waitUntil: 'domcontentloaded'});
            const prebidVersion = await page.evaluate(`pbjs.version`);
            expect(prebidVersion).toBe('v1.14.0');
        }, 10000);
    });

});
