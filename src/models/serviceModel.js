const mysql = require("mysql");
const config = require("../../config/config");
const db = mysql.createConnection(config.db);
const serviceModel = {
  getAllService: (callback) => {
    db.query("SELECT * FROM service", (err, result) => {
      if (err) throw result;
      callback(result);
    });
  },
  getServiceByCode: function (service_code, callback) {
    const query = "SELECT * FROM service WHERE service_code = ?";
    db.query(query, [service_code], function (error, results) {
      if (error) throw error;
      callback(null, results[0]);
    });
  },
};
module.exports = serviceModel;
