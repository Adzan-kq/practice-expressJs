const express = require("express");
const router = express.Router();

let users = [
  { id: 1, name: "Muhammad Adzan Nurkholiq", school: "Smkn 1 Cimahi" },
];

router
  .route("/user")
  .get(function (req, res) {
    if (users.length > 0) {
      res.json({
        statusbar: true,
        data: users,
        method: req.method,
      });
    } else {
      res.json({
        statusbar: false,
        data: users,
        message: "user is empty",
      });
    }
  })
  .post(function (req, res) {
    users.push({
      id: parseInt(req.body.id),
      name: req.body.name,
      sekolah: req.body.sekolah,
    });
    res.json({
      statusbar: true,
      data: users,
      message: "User data has been successfully saved",
    });
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
    res.json({
      statusbar: true,
      data: users,
      message: "User data has been successfully update",
    });
  })
  .delete(function (req, res) {
    const id = req.params.userId;
    users = users.filter((user) => user.id != id);
    res.json({
      statusbar: true,
      data: users,
      message: "Success delete this user",
    });
  });

module.exports = router;
