const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send("Home Page");
  console.log(response);
});

app.get("/about", (request, response) => {
  response.send("About Page");
  console.log(response);
});

app.listen(3000);

module.exports = app;
