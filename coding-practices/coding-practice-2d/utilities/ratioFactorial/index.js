const factorialOfNum = require("../factorial/index");
const ratioOfNum = require("../ratio/index");

const ratioAndFactorial = (num1, num2, num3) => {
  const ratio = ratioOfNum(num1, num2);
  const factorial = factorialOfNum(num3);
  return { ratio, factorial };
};

module.exports = ratioAndFactorial;
