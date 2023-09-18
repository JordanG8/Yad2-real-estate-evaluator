const puppeteer = require("puppeteer");

const config = {
  sitekey: "84edd4de146581a0440e9f0c58c32066",
  url: "https://www.yad2.co.il/realestate/rent",
  apiKey: "28651cb38a45bcf434b23dde14f584e0",
  apiSubmitUrl: "http://2captcha.com/in.php",
  apiRetriveUrl: "http://2captcha.com/res.php",
};

const chromeOptions = {
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: false,
  sloMo: 10,
  defaultViewport: null,
};

async function GetPrices() {
  try {
    const browser = await puppeteer.launch(chromeOptions, {
      ignoreDefaultArgs: ["--disable-extensions"],
      timeout: 3000,
    });
    const page = await browser.newPage();

    await page.goto(config.url);
    await page.screenshot({ path: "screenshot.png" });

    const prices = await page.$$eval(".price", (element) => element.innerText);
    const text = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(".price"),
        (element) => element.textContent
      )
    );
    text.forEach((element) => console.log(element));
  } catch (error) {
    console.error(error);
  }
}
GetPrices();
