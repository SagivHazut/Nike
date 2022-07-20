const { Transactions } = require("../transactionsModel");
const lodash = require("lodash");

async function generateBizNum() {
  while (true) {
    //הלולאה תמשיך לרוץ עד שלא מצאנו קארד
    const randomNum = lodash.random(1000000, 9999999);
    const card = await Transactions.findOne({ bizNumber: randomNum });
    if (!card) return String(randomNum);
  }
}
exports.generateBizNum = generateBizNum;
