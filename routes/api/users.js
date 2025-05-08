const express = require("express");
const router = express.Router();
const uuid = require("uuid");
let users = require("../../Users");

//get all users
router.get("/", (req, res) => {
  res.json(users);
});

//get user by id
router.get("/", (req, res) => {
  res.json(users);
});

module.exports = router;
