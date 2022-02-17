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

// POST REGISTRATION
router.post("/", (req, res) => {
  const { title, body, date, author } = req.body;
  if (!title || !body || !date || !author)
    res.statusCode(400).send({ msg: "Not all fields have been submitted" });

  var sql = `INSERT INTO posts (post_title, post_body, post_date, post_author) VALUES ('${title}', '${body}','${date}', '${author}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.send({ msg: "posted" });
  });
});

// GET ALL POSTS
router.get("/", (req, res, next) => {
  var sql = `SELECT * FROM posts`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.send(result);
  });
});

// GET 1 (ID)

router.get("/:id", (req, res, next) => {
  var sql = `SELECT * FROM posts WHERE post_id =${req.params.id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.send(result);
  });
});

router.put("/:id", (req, res, next) => {
  const { title, body } = req.body;
  let sql = `UPDATE posts SET `;
  if (title) sql += `user_name=${title}`;
  if (body) sql += `user_name=${body}`;

  sql += `WHERE post_id=${req.params.id}`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
    res.send(result);
  });
});
// DELETE POSTS
router.delete("/:id", (req, res, next) => {
  var sql = `DELETE * FROM posts WHERE post_id =${req.params.id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
    res.send(result);
  });
});

module.exports = router;
