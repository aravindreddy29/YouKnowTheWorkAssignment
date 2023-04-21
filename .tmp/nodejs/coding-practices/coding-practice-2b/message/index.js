const messageString = require("../greeting/index");
const greetMessage = `Hello Rahul! ${messageString}`;
module.exports = messageString;
module.exports = greetMessage;
console.log(greetMessage);
