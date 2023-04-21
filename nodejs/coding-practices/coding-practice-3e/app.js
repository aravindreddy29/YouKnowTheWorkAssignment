const express = require("express");
const app = express();
app.get("/", (request, response) => {
  const result = new Date();
  response.send(
    `${result.getDate()}-${result.getMonth() + 1}-${result.getFullYear()}`
  );
});
module.exports = app;
