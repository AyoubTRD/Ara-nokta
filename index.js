const fs = require("fs");
const path = require("path");

const express = require("express");
// const puppeteer = require("puppeteer");

let jokes = JSON.parse(fs.readFileSync("./jokes.json"));

function getRandomJoke() {
  return jokes[Math.floor(Math.random() * jokes.length)];
}

(async () => {
  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();

  // const getJokes = async (url) => {
  //   await page.goto(url);
  //   const jokesElements = await page.$$('[itemprop="blogPost"]');
  //   const jokes = [];
  //   await Promise.all(
  //     jokesElements.map(async (joke) => {
  //       const jokeTitle = await joke.$('[itemprop="headline"]');
  //       const jokeBody = await joke.$('p[style="text-align: right;"]');
  //       const jokeImage = await joke.$('img[width="560"]');
  //       jokes.push({
  //         title:
  //           jokeTitle &&
  //           (await page.evaluate(
  //             (jokeTitle) => jokeTitle.textContent,
  //             jokeTitle
  //           )),
  //         body:
  //           jokeBody &&
  //           (await page.evaluate((jokeBody) => jokeBody.textContent, jokeBody)),
  //         image:
  //           jokeImage &&
  //           "https://nokatzwina.com" +
  //             (await page.evaluate(
  //               (jokeImage) => jokeImage.getAttribute("src"),
  //               jokeImage
  //             )),
  //       });
  //     })
  //   );
  //   return jokes;
  // };

  // while (jokes.length < 2000) {
  //   jokes = [
  //     ...jokes,
  //     ...(await getJokes("https://nokatzwina.com/?start=" + jokes.length)),
  //   ];
  // }

  // fs.writeFileSync(path.join(__dirname, "jokes.json"), JSON.stringify(jokes));

  const app = express();

  const PORT = process.env.PORT || 3000;

  app.set("view engine", "ejs");

  app.use(express.static("public"));

  app.get("/", (req, res) => {
    let randomJoke = {};
    while (!(randomJoke.image || randomJoke.body)) {
      randomJoke = getRandomJoke();
    }
    res.render("index", {
      joke: randomJoke,
    });
  });

  app.get("/api/random", (req, res) => {
    let randomJoke = {};
    while (!(randomJoke.image || randomJoke.body)) {
      randomJoke = getRandomJoke();
    }
    res.json({
      joke: randomJoke,
    });
  });

  const server = app.listen(PORT, () =>
    console.log(`Server up on port ${PORT}`)
  );
})();
