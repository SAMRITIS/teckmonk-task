const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());
const createError = require("http-errors");
const router = require("./router/index.router");

app.use("/", router);
app.use(async (req, res, next) => {
  next(createError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message:
        process.env.MODE === "development" ? err.message : "Error Occoured",
    },
  });
});

app.get("/", async (req, res, next) => {});

app.listen(port, () => {
  console.log(`Server is listening on Port Number : ${port}`);
});
