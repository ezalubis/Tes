const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const config = require("../../config/config");
const db = mysql.createConnection(config.db);
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");
});

const userModel = {
  createUser: function (email, first_name, last_name, password, callback) {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw err;
      const sql =
        "INSERT INTO users (email, first_name, last_name, password) VALUES (?, ?, ?, ?)";
      db.query(sql, [email, first_name, last_name, hash], (err, result) => {
        if (err) throw err;
        callback(result);
      });
    });
  },

  findUserByEmail: function (email, callback) {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, result) => {
      if (err) throw err;
      callback(result.length ? result[0] : null);
    });
  },
  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE id = ?", [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.length ? results[0] : null); // Pastikan mengembalikan pengguna jika ditemukan
        }
      });
    });
  },

  updateUserById: function (id, userData, callback) {
    const { profile_image } = userData;
    let sql = `UPDATE users SET profile_image = ? WHERE id = ?`;
    db.query(sql, [profile_image, id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },
  updateNameById: (id, userData, callback) => {
    const { first_name, last_name } = userData;
    let sql = `UPDATE users SET first_name = ?,last_name=? WHERE id = ?`;

    db.query(sql, [first_name, last_name, id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },
  getBalance: (id, callback) => {
    db.query(
      "SELECT balance FROM users where id= ?",
      [id],
      (error, results) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, results[0]);
      }
    );
  },
  topUpBalance: function (id, amount, callback) {
    const query = "UPDATE users SET balance = balance + ? WHERE id = ?";
    db.query(query, [amount, id], callback);
  },
  updateBalance: (id, newBalance) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET balance = ? WHERE id = ?",
        [newBalance, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
};

module.exports = userModel;
