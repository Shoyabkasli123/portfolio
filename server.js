const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/playstore", async (req, res) => {
  const { url } = req.query;
  if (!url || !url.includes("play.google.com/store/apps/details")) {
    return res.status(400).json({ error: "Invalid Play Store URL" });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const data = await page.evaluate(() => {
      const name = document.querySelector("h1 span")?.textContent;
      const icon = document.querySelector('img.T75of[src]')?.src;
      const description = document.querySelector('[jsname="bN97Pc"]')?.textContent;

      const screenshots = Array.from(document.querySelectorAll('img.T75of[src]'))
        .map(img => img.src)
        .filter((src, idx) => idx > 0)
        .slice(0, 4);

      return { name, icon, description, screenshots };
    });

    await browser.close();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Play Store data" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
