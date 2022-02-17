const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "lifechoices",
  password: "@Lifechoices1234",
  database: "personal_blog",
});

// USER REGISTRATION
router.post("/", (req, res) => {
  const { name, email, contact, password } = req.body;
  if (!name || !email || !contact || !password)
    res.statusCode(400).send({ msg: "Not all fields have been submitted" });

  var sql = `INSERT INTO users (user_name, user_contact, user_email, user_password) VALUES ('${name}', '${contact}','${email}',  '${password}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.send({ msg: "user created" });
  });
});

// GET ALL USERS
router.get("/", (req, res, next) => {
  var sql = `SELECT * FROM users`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.send(result);
  });
});

// GET 1 (ID)

router.get("/:id", (req, res, next) => {
  var sql = `SELECT * FROM users WHERE user_id =${req.params.id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.send(result);
  });
});

// SIGN IN USER (GET 1 BY EMAIL AND PASSWORD)

router.patch("/", (req, res) => {
  const { email, password } = req.body;
  var sql = `SELECT * FROM user_email=${email} AND user_password=${password}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record found");
    res.send(result);
  });
});

// DELETE USER
router.delete("/:id", (req, res, next) => {
  var sql = `DELETE * FROM users WHERE user_id =${req.params.id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
    res.send(result);
  });
});

// UPDATE USER
router.put("/:id", (req, res, next) => {
  const { name, email, password, contact, avatar, about } = req.body;
  let sql = `UPDATE users SET `;
  if (name) sql += `user_name=${name}`;
  if (email) sql += `user_name=${email}`;
  if (password) sql += `user_name=${password}`;
  if (contact) sql += `user_name=${contact}`;
  if (avatar) sql += `user_name=${avatar}`;
  if (about) sql += `user_name=${about}`;

  sql += `WHERE user_id=${req.params.id}`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
    res.send(result);
  });
});
module.exports = router;
