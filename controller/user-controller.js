const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getListUsers: function (req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
          SELECT * FROM user;
          `,
        function (error, results) {
          if (error) throw error;
          res.send({
            success: true,
            message: "Berhasil ambil data!",
            data: results,
            method: req.method,
          });
        }
      );
      connection.release();
    });
  },
  createUsers: function (req, res) {
    let createUser = {
      name: req.body.name,
      telp: req.body.telp,
      email: req.body.email,
    };

    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
          INSERT INTO user SET ?;
          `,
        [createUser],
        function (error, results) {
          if (error) throw error;
          res.send({
            success: true,
            message: "User data has been successfully saved",
            method: req.method,
          });
        }
      );
      connection.release();
    });
  },
  updateUsers: function (req, res) {
    const id = req.params.userId;
    let updateUser = {
      name: req.body.name,
      telp: req.body.telp,
      email: req.body.email,
      age: req.body.age,
    };

    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
          UPDATE user SET ? WHERE id = ?;
          `,
        [updateUser, id],
        function (error, results) {
          if (error) throw error;
          res.send({
            success: true,
            message: "User data has been successfully update",
            method: req.method,
          });
        }
      );
      connection.release();
    });
  },
  deleteUsers: function (req, res) {
    const id = req.params.userId;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
          DELETE FROM user WHERE id = ?;
          `,
        [id],
        function (error, results) {
          if (error) throw error;
          res.send({
            success: true,
            message: "Success delete this user",
            method: req.method,
          });
        }
      );
      connection.release();
    });
  },
};
