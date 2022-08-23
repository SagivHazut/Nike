const bcrypt = require("bcryptjs");

function generateHashPassword(pass) {
  return bcrypt.hashSync(pass, 10);
}

function comparePassword(password, anotherPassword) {
  return bcrypt.compareSync(password, anotherPassword);
}
const createHash = (pass) => {
  return bcrypt.hash(pass, 10);
};

module.exports = { generateHashPassword, comparePassword, createHash };
