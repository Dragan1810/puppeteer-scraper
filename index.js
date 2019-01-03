const puppeteer = require("puppeteer");

const URL =
  "http://www.scoresway.com/?sport=soccer&page=matches&date=2018-12-17";

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

  const MatchesHeaders = ".group-head.clickable";
  const Divz = await page.$$(MatchesHeaders);
  Divz.forEach(el => el.click());

  const DataBox = ".group-head.clickable.expanded.loaded";
  const ContentBox = ".even.expanded.first.last.match.no-date-repetition";

  const Content = await page.$$(ContentBox);
  console.log(Content.length);
  //const test = await page.evaluate(data => data.innerHTML, Content[1]);
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

  console.log(cleanData);

  //await browser.close();
})();
