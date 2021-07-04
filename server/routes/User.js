const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../config/db");

router.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (username,email,password) VALUE (?,?,?);",
    [username, email, password],
    (err, results) => {
      console.log(err);
      res.send(results);
    }
  );
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?", email, (err, results) => {
    if (err) {
      console.log(err);
    }
    if (results.length > 0) {
      if (password == results[0].password) {
        res.json({ loggedIn: true, username: results[0].username });
      } else {
        res.json({ loggedIn: false, message: "Wrong Password" });
      }
    } else {
      res.json({ loggedIn: false, message: "User doesn't exist." });
    }
  });
});

const upload = multer();
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

router.post(
  "/createpost",
  upload.single("file"),
  async function (req, res, next) {
    const {
      file,
      body: { username, caption },
    } = req;
    const fileName = username + Date.now() + file.detectedFileExtension;
    const datetime = new Date()
      .toJSON()
      .slice(0, 10)
      .split("-")
      .reverse()
      .join("/");
    await pipeline(
      file.stream,
      fs.createWriteStream(`${__dirname}/../images/${fileName}`)
    );
    db.query(
      "INSERT INTO posts (username,image,thumbsup,caption,date) VALUE (?,?,?,?,?);",
      [username, fileName, 0, caption, datetime],
      (err, results) => {
        console.log(err);
        res.json(true);
      }
    );
  }
);

router.get("/posts", (req, res) => {
  db.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});

router.post("/like", (req, res) => {
  const username = req.body.username;
  const postid = req.body.postid;
  console.log(req.body);
  db.query(
    "INSERT INTO likes (username, postid) Value (?,?)",
    [username, postid],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      db.query(
        "Update posts set thumbsup = thumbsup+1 WHERE postid = ?",
        postid,
        (err1, results1) => {
          if (err1) {
            console.log(err1);
          }
          console.log(results1);
          res.send(results);
        }
      );
    }
  );
});

router.post("/liked", (req, res) => {
  const username = req.body.username;
  const postid = req.body.postid;
  db.query(
    "SELECT * FROM likes WHERE username = ? and postid =?",
    [username, postid],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results.length > 0) {
        console.log(results);
        res.json({ liked: true });
      } else {
        res.json({ liked: false });
      }
    }
  );
});

router.post("/dislike", (req, res) => {
  const username = req.body.username;
  const postid = req.body.postid;
  console.log(req.body);
  db.query(
    "DELETE FROM likes WHERE username = ? and postid = ?",
    [username, postid],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      db.query(
        "Update posts set thumbsup = thumbsup-1 WHERE postid = ?",
        postid,
        (err1, results1) => {
          if (err1) {
            console.log(err1);
          }
          console.log(results1);
          res.send(results);
        }
      );
    }
  );
});
module.exports = router;
