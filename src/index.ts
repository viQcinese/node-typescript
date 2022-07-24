import express from "express";
import puppeteer from "puppeteer";

const app = express();

app.get("/", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.nhk.or.jp/");

  const data = await page.evaluate(() => {
    return {
      title: document.querySelector("h1")?.innerText,
    };
  });
  await browser.close();

  res.status(200).json(data);
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
