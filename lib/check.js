const puppeteer = require('puppeteer');

module.exports = async (config) => {
    const browser = await puppeteer.launch({
        headless: !config.debug,
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
        defaultViewport: { width: 412, height: 732 },
        ignoreHTTPSErrors: true,
    });
    const browserContext = await browser.createIncognitoBrowserContext();
    const page = await browserContext.newPage();
    await page.goto(config.url, { waitUntil: 'networkidle0' });
    await page.evaluate(
        () =>
            new Promise((resolve) => {
                requestIdleCallback(resolve);
            })
    );
    const evaluation = await page.evaluate((s) => {
            return {
                count: document.querySelectorAll(s).length
              };
      }, config.selector);
    await page.close();
    if (evaluation.count > parseInt(config.count)) {
        return 0
    }
    return 2
}