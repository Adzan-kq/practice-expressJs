const express = require("express");
const router = express.Router();
const userController = require("../controller/user-controller");

router
  .route("/users")
  .get(userController.getListUsers)
  .post(userController.createUsers);

router
  .route("/users/:userId")
  .put(userController.updateUsers)
  .delete(userController.deleteUsers);

module.exports = router;
