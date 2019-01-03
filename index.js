const puppeteer = require("puppeteer");

const URL = "http://www.scoresway.com/?sport=home&page=matches&date=2018-12-17";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(URL);
  await page.screenshot({ path: "example.png" });

  await browser.close();
})();
