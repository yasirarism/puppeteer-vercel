import { launch, Page } from "puppeteer-core";
import chrome from "chrome-aws-lambda";
let _page: Page | null;

async function getPage() {
    if (_page) return _page;
    const options = { 
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
    };
    const browser = await launch(options);
    _page = await browser.newPage();
    return _page;
}

export async function getScreenshot(url, width, height) {
    const page = await getPage();
    await page.goto(url);
    await page.setViewport({ width: Number(width) || 1280, height: Number(height) || 720, deviceScaleFactor: 2 });
    // await page.waitForNavigation();
    const file = await page.screenshot();
    return file;
}

export async function getContent(url) {
    const page = await getPage();
    await page.goto(url);
    await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });
    // await page.waitForNavigation();
    const content = await page.content();
    return content;
}
