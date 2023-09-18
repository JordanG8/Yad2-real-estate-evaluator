const puppeteer = require("puppeteer");
const fs = require("fs");

const config = {
  sitekey: "84edd4de146581a0440e9f0c58c32066",
  url: "https://www.yad2.co.il/realestate/rent",
  apiKey: "28651cb38a45bcf434b23dde14f584e0",
  apiSubmitUrl: "http://2captcha.com/in.php",
  apiRetriveUrl: "http://2captcha.com/res.php",
};

const chromeOptions = {
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", // CHANGE THIS TO YOUR CHROME.EXE PATH
  headless: false,
  sloMo: 10,
  defaultViewport: null,
};

async function GetYad2List() {
  try {
    const browser = await puppeteer.launch(chromeOptions, {
      ignoreDefaultArgs: ["--disable-extensions"],
      timeout: 6000,
    });
    const page = await browser.newPage();

    await page.goto(config.url);
    // await page.screenshot({ path: "screenshot.png" });
    for (let pageNumber = 1; pageNumber < 5; pageNumber++) {
      const prices = await page.evaluate(() =>
        Array.from(
          document.querySelector(".feed_list").querySelectorAll(".price"),
          (element) => element.textContent
        )
      );
      prices.forEach((element) => console.log(element));
      for (let i = 0; i < prices.length; i++) {
        fs.appendFile("dump.txt", prices[i], (err) => {
          if (err) {
            console.error(err);
          }
        });
      }

      var newPage = config.url.concat("?page=", pageNumber.toString());
      page.goto(newPage);
      await page.waitForNavigation({ waitUntil: "networkidle2" });
    }
  } catch (error) {
    console.error(error);
  }
}
GetYad2List();
