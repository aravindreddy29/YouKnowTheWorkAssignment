const peopleNames = require("../country/state/city/index");
const FirstName = require("../utilities/utils/index");

const getPeopleInCity = (peopleNames) => {
  return FirstName(peopleNames);
};
module.exports = getPeopleInCity;
