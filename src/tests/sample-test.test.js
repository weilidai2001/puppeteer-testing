const puppeteer = require('puppeteer');

const PAGE_LOAD_TIMEOUT = 4000;

let browser;
let page;

describe('Gumtree()', () => {
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
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

            try {
                await page.goto('https://www.gumtree.com/for-sale', {timeout: PAGE_LOAD_TIMEOUT});
            } catch (e) {}
            expect(isAdSenseCalled).toBe(true);
        }, 10000);

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

            try {
                await page.goto('https://www.gumtree.com/for-sale', {timeout: PAGE_LOAD_TIMEOUT});
            } catch (e) {}

            expect(isAdSenseCalled).toBe(true);
        }, 20000);
    });

    describe('prebid()', () => {
        beforeEach(async () => {
            page = await browser.newPage();
        });

        test('prebid version on homepage', async () => {
            try {
                await page.goto('https://www.gumtree.com/', {timeout: PAGE_LOAD_TIMEOUT});
            } catch (e) {}

            const prebidVersion = await page.evaluate(`pbjs.version`);
            expect(prebidVersion).toBe('v1.14.0');
        });

        test('prebid version on for-sale page', async () => {
            try {
                await page.goto('https://www.gumtree.com/for-sale', {timeout: PAGE_LOAD_TIMEOUT});
            } catch (e) {}
            const prebidVersion = await page.evaluate(`pbjs.version`);
            expect(prebidVersion).toBe('v1.14.0');
        }, 10000);
    });

});
