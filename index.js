const puppeteer = require("puppeteer");

const URL =
  "http://www.scoresway.com/?sport=soccer&page=matches&date=2018-12-18";

function getUrl() {
  let sport = "soccer";
  let page = "matches";
  let date = "2018-12-17";

  return URL;
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(URL);

  async function getHeader() {
    const headClickExpanded = ".group-head.clickable.expanded.loaded";
    const headClick = ".group-head.clickable.loaded";
    const headExpanded = ".group-head.expanded.loaded";

    let h1 = await page.$$(headClick);
    let h2 = await page.$$(headClickExpanded);
    let h3 = await page.$$(headExpanded);

    return [...h1, ...h2, ...h3];
  }

  async function getElements() {
    const EvenOnlyContent =
      ".even.expanded.first.last.match.no-date-repetition";
    const EvenFirstContent = ".even.expanded.first.match.no-date-repetition";
    const EvenLastContent = ".even.expanded.last.match.no-date-repetition";
    const EvenContent = ".even.expanded.match.no-date-repetition";

    const OddOnlyContent = ".odd.expanded.first.last.match.no-date-repetition";
    const OddFirstContent = ".odd.expanded.first.match.no-date-repetition";
    const OddLastContent = ".odd.expanded.last.match.no-date-repetition";
    const OddContent = ".odd.expanded.match.no-date-repetition";
    let e1 = await page.$$(EvenOnlyContent);
    let e2 = await page.$$(EvenFirstContent);
    let e3 = await page.$$(EvenLastContent);
    let e4 = await page.$$(EvenContent);
    let o1 = await page.$$(OddOnlyContent);
    let o2 = await page.$$(OddFirstContent);
    let o3 = await page.$$(OddLastContent);
    let o4 = await page.$$(OddContent);

    return [...e1, ...e2, ...e3, ...e4, ...o1, ...o2, ...o3, ...o4];
  }

  const ResultData = [];

  const HeadersContent = await getHeader();

  const MatchesHeaders = ".group-head.clickable";
  const Headers = await page.$$(MatchesHeaders);

  Headers.forEach(async el => {
    await el.click(".load_more a");
    //page.waitForNavigation({ waitUntil: "networkidle2" })
    // header
    let nesto = await page.evaluate(stuff => stuff.innerHTML, el);
    console.log(nesto);
  });

  const Content = await getElements();

  console.log(Content.length);
  let cleanData = [];
  let ListData = Content.map(async htmlBlock => {
    const data = await page.evaluate(dataBox => {
      const minute = dataBox
        .querySelector(".minute")
        .textContent.replace(/(\s)/gm, "");
      const teamA = dataBox
        .querySelector(".team.team-a > a")
        .textContent.replace(/(\s)/gm, "");
      const score = dataBox
        .querySelector(".score-time.score > a")
        .textContent.replace(/(\s)/gm, "");
      const teamB = dataBox
        .querySelector(".team.team-b > a")
        .textContent.replace(/(\s)/gm, "");

      return { minute, teamA, teamB, score };
    }, htmlBlock);

    return data;
  });

  for await (data of ListData) {
    cleanData.push(data);
  }

  //console.log(cleanData);

  //await browser.close();
})();

/*
 
const puppeteer = require('.');

(async() => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.emulate({
        'viewport': {
          'width': 1400,
          'height': 1000,
          'isMobile': false
        },
        'userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
  })

  await page.goto('https://www.kickstarter.com/discover/advanced?sort=newest', {waitUntil: 'networkidle0'});

  await page.click('.load_more a');
  await page.waitForFunction(() => document.querySelectorAll('div[data-project]').length === 24, {
    polling: 'mutation'
  });

  let projectCount = (await page.$$('div[data-project]')).length;
  console.log(projectCount, ' projects');
})();

 */
