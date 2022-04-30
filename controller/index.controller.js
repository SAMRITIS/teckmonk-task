const axios = require("axios");
const createError = require("http-errors");

exports.getTimeStories = async (req, res, next) => {
  try {
    let response = [];
    let data = await axios.get("https://time.com");
    let arrFirst = data.data.match(/<div class="dek">([\s\S]*?)div>/g);
    for (let i = 0; i < 3; i++) {
      let temp = {
        title: arrFirst[i]
          .match(/<h3 class="title no-eyebrow">(.*)h3>/g)[0]
          .split('<h3 class="title no-eyebrow">')[1]
          .split("</h3>")[0],
        link:
          "https://time.com" +
          arrFirst[i]
            .match(/<a href="(.*)>/g)[0]
            .split('<a href="')[1]
            .split('/">')[0],
      };
      response.push(temp);
    }

    let arrSecond = data.data.match(
      /<a class="most-popular-feed__item-section"([\s\S]*?)div>/g
    );
    for (let i = 0; i < 3; i++) {
      let temp = {
        title: arrSecond[i]
          .match(/<h3 class="most-popular-feed__item-headline">(.*)h3>/g)[0]
          .split('<h3 class="most-popular-feed__item-headline">')[1]
          .split("</h3>")[0],
        link:
          "https://time.com" +
          arrSecond[i]
            .match(/<a href="(.*)>/g)[0]
            .split('<a href="')[1]
            .split('/">')[0],
      };
      response.push(temp);
    }
    res.status(200).send(response);
  } catch (error) {
    next(createError(500, error.message));
  }
};
