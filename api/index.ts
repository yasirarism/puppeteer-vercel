const { getScreenshot, getContent } = require("./_lib/puppeteer");
const app = require("express")();

app.get("/webss", async (req, res) => {
  if (!req.query.url) return res.status(400).send("No url query specified.");
  if (!checkUrl(req.query.url)) return res.status(400).send("Invalid url query specified.");
  try {
    const file = await getScreenshot(req.query.url, req.query.width, req.query.height);
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, immutable, no-transform, s-maxage=86400, max-age=86400");
    res.status(200).end(file);
  } catch (error) {
    console.error(error)
    res.status(500).send("The server encountered an error. You may have inputted an invalid query.");
  }
}

app.get("/pahe", async (req, res) => {
  if (!req.query.url) return res.status(400).send("No url query specified.");
  if (!checkUrl(req.query.url)) return res.status(400).send("Invalid url query specified.");
  try {
    const content = await getContent(req.query.url);
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "public, immutable, no-transform, s-maxage=86400, max-age=86400");
    res.status(200).end(content);
  } catch (error) {
    console.error(error)
    res.status(500).send("The server encountered an error. You may have inputted an invalid query.");
  }
}

function checkUrl(string, hostname) {
  var url = "";
  try {
    url = new URL(string);
  } catch (error) {
    return false;
  }
  return true;
}

module.exports = app;
