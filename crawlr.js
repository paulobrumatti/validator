const puppeteer = require('puppeteer');
const simulatorBuilder = require('./simulator-builder.js');
const { blockRequests, requestHandlerBuilder } = require('./util.js');

const main = async (urls, { headless = true } = {}) => {
  const start = new Date();
  const browser = await puppeteer.launch({ headless });

  const results = await Promise.all(
    urls.map(async ({ url, handler }) => {
      const requests = [];
      const page = await browser.newPage();
      await page.setRequestInterception(true);
      page.on('request', blockRequests);
      page.on('requestfinished', requestHandlerBuilder(requests));
      await page.setViewport({ width: 1368, height: 766 });
      await page.goto(url, { waitUntil: 'networkidle2' });
      await handler(simulatorBuilder(page));
      await page.waitForTimeout(2000);
      await page.close();

      return { requests, url };
    })
  );

  await browser.close();
  return { results, duration: new Date() - start };
};

module.exports = main;
