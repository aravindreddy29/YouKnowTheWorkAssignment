const express = require("express");
const app = express();
const addDays = require("date-fns/addDays");

app.get("/", (request, response) => {
  const newDate = new Date();
  const getDateAfterXDays = addDays(
    new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()),
    100
  );

  response.send(
    `${getDateAfterXDays.getDate()}/${
      getDateAfterXDays.getMonth() + 1
    }/${getDateAfterXDays.getFullYear()}`
  );
});

app.listen(3000);
module.exports = app;
