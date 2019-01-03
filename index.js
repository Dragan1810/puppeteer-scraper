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
  const stuff = await page.evaluate(dataBox => {
    const minute = document
      .querySelector(".minute")
      .textContent.replace(/(\r\s\n\t|\n|\r\t)/gm, "")
      .trim();
    const teamA = document
      .querySelector(".team.team-a > a")
      .textContent.replace(/(\r\s\n\t|\n|\r\t)/gm, "")
      .trim();
    const score = document
      .querySelector(".score-time.score > a")
      .textContent.replace(/(\r\s\n\t|\n|\r\t)/gm, "")
      .trim();
    const teamB = document
      .querySelector(".team.team-b > a")
      .textContent.replace(/(\r\s\n\t|\n|\r\t)/gm, "")
      .trim();

    return { minute, teamA, teamB, score };
  }, Content[0]);
  console.log(stuff);
  /*
  // Extract the results from the page.
  const links = await page.evaluate(resultsSelector => {
    const anchors = Array.from(document.querySelectorAll(resultsSelector));
    return anchors.map(anchor => {
      const title = anchor.textContent.split("|")[0].trim();
      return `${title} - ${anchor.href}`;
    });
  }, resultsSelector);
  console.log(links.join("\n"));
*/
  //await browser.close();
})();
