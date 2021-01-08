const puppeteer = require('puppeteer');

module.exports = async (config) => {
    const browser = await puppeteer.launch({
        headless: !config.debug,
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
        defaultViewport: { width: 412, height: 732 },
        ignoreHTTPSErrors: true
    });
    const browserContext = await browser.createIncognitoBrowserContext();
    const page = await browserContext.newPage();
    if (config.userAgent) {
        await page.setUserAgent(config.userAgent)
    }
    let response = await page.goto(config.url, { waitUntil: 'networkidle0' });
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
    let status = response.status();
    if (evaluation.count > parseInt(config.count)) {
        return {
            code: 0,
            vv: 'OK - Pattern '+config.selector+' found '+evaluation.count+' times in '+config.url+'('+status+')',
            v: 'OK - Pattern found'

        }
    }
    return {
        code: 2,
        vv: 'CRITIAL - Pattern '+config.selector+ ' was found only '+evaluation.count+' times in '+config.url+'('+status+')'+'. Expected '+config.count+'+ times',
        v: 'CRITICAL - Pattern not found'
    }
}