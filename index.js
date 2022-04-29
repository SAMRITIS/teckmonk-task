const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());
const axios = require("axios");
const fs = require("fs");
let response = [];

app.get("/", async (req, res, next) => {
  try {
    let result = await axios.get("http://time.com");
    let arr1 = result.data.match(/<div class="dek">([\s\S]*?)div>/g);
    for (let i = 0; i < arr1.length; i++) {
      let temp = {
        title: arr1[i]
          .match(/<h3 class="title no-eyebrow">(.*)h3>/g)[0]
          .split('<h3 class="title no-eyebrow">')[1]
          .split("</h3>")[0],
        link:
          "https://time.com" +
          arr1[i]
            .match(/<a href="(.*)>/g)[0]
            .split('<a href="')[1]
            .split('/">')[0],
      };
      response.push(temp);
    }

    let arr2 = result.data.match(
      /<a class="most-popular-feed__item-section"([\s\S]*?)div>/g
    );
    for (let i = 0; i < 2; i++) {
      let temp = {
        title: arr2[i]
          .match(/<h3 class="most-popular-feed__item-headline">(.*)h3>/g)[0]
          .split('<h3 class="most-popular-feed__item-headline">')[1]
          .split("</h3>")[0],
        link:
          "https://time.com" +
          arr2[i]
            .match(/<a href="(.*)>/g)[0]
            .split('<a href="')[1]
            .split('/">')[0],
      };
      response.push(temp);
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on Port Number : ${port}`);
});
