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
    subject: "Thank you for buying from us!",
    html: getPassResetLink(to),
  };
}

function getPassResetLink() {
  return `<h1>Thanks for being a great customer!</h1>
  <h4>Your order is on the way</h4>
  
  `;
}

router.get("/payments", (req, res) => {
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

module.exports = router;
