const mysql = require("mysql");
const config = require("../../config/config");
const db = mysql.createConnection(config.db);

const transactionModel = {
  createTransaction: function (transactionData, callback) {
    const query = `INSERT INTO transaction (transaction_type, amount, description, create_at) VALUES (?, ?, ?, NOW())`;
    db.query(
      query,
      [
        transactionData.transaction_type,
        transactionData.amount,
        transactionData.description,
      ],
      callback
    );
  },
  getLastInvoiceNumber: (callback) => {
    const query = `SELECT COUNT(*) AS count FROM history`;
    db.query(query, (err, result) => {
      if (err) return callback(err);
      const count = result[0].count + 1; // Meningkatkan count untuk invoice berikutnya
      const date = new Date().toISOString().slice(2, 10).replace(/-/g, "");
      const invoiceNumber = `INV${date}-${String(count).padStart(3, "0")}`;
      callback(null, invoiceNumber);
    });
  },

  saveTransactionHistory: (transactionData, callback) => {
    console.log(transactionData);
    transactionModel.getLastInvoiceNumber((err, invoiceNumber) => {
      if (err) return callback(err);
      const { transaction_type, amount, description } = transactionData;
      const query = `INSERT INTO history (invoice_number, transaction_type, amount, description, create_on) VALUES (?, ?, ?, ?, NOW())`;
      db.query(
        query,
        [invoiceNumber, transaction_type, amount, description],
        (err, result) => {
          if (err) return callback(err);
          callback(null, { invoiceNumber });
        }
      );
    });
  },
  getTransactionHistory: function (callback) {
    let query = `SELECT * FROM history ORDER BY create_on DESC`;
    db.query(query, callback);
  },
};

module.exports = transactionModel;
