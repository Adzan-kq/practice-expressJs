const express = require("express");
const router = express.Router();

let users = [
  { id: 1, name: "Muhammad Adzan Nurkholiq", school: "Smkn 1 Cimahi" },
];

router
  .route("/user")
  .get(function (req, res) {
    res.json(users);
  })
  .post(function (req, res) {
    users.push({
      id: parseInt(req.body.id),
      name: req.body.name,
      sekolah: req.body.sekolah,
    });
    res.json(users);
  });

router
  .route("/user/:userId")
  .put(function (req, res) {
    const id = req.params.userId;
    users.filter((user) => {
      if (user.id == id) {
        user.id = parseInt(id);
        user.name = req.body.name;
        user.sekolah = req.body.sekolah;

        return user;
      }
    });
    res.json(users);
  })
  .delete(function (req, res) {
    const id = req.params.userId;
    users = users.filter((user) => user.id != id);
    res.json(users);
  });

module.exports = router;
