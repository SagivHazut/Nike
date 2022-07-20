const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("./Users/userModel");
const bcrypt = require("../services/bcrypt");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hazutsagiv@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

function getMailOptions(to) {
  return {
    from: "hazutsagiv@gmail.com",
    to: to,
    subject: "MyApp - Reset password",
    html: getPassResetLink(to),
  };
}

function getPassResetLink(to) {
  return `<a href='http://localhost:3000/resetpassword?email=${to}'>Rest password</a>`;
}

router.get("/resetPassword", (req, res) => {
  let { email } = req.query;
  let options = getMailOptions(email);
  transporter.sendMail(options, (err, info) => {
    if (err) {
      res.statusCode = 500;
      res.json({ err });
    } else {
      res.statusCode = 200;
      res.json(info);
    }
  });
});
const updateUserPassword = async (email, newPass) => {
  return await new Promise((success, failure) => {
    try {
      User.findOneAndUpdate({ email: email }, { password: newPass })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
      success("Successfully changed pass");
    } catch (e) {
      failure(e);
    }
  });
};

router.post("/updatepass", (req, res) => {
  let { email, newPass } = req.query;
  bcrypt.createHash(newPass).then((hashedPass) => {
    updateUserPassword(email, hashedPass)
      .then((updateRes) => {
        res.statusCode = 200;
        res.json({ updateRes });
      })
      .catch((err) => {
        res.statusCode = 500;
        console.log(err);
        res.json({ err });
      });
  });
});

module.exports = router;
