const mysql = require("mysql");
const config = require("../../config/config");
const db = mysql.createConnection(config.db);
const bannerModel = {
  getAllBanner: (callback) => {
    db.query("SELECT * FROM banner", (err, result) => {
      if (err) throw result;
      callback(result);
    });
  },
};
module.exports = bannerModel;
