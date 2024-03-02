const userModel = require("../models/authmodel");
const serviceModel = require("../models/serviceModel");
const transactionModel = require("../models/transactionModel");
const { validationResult } = require("express-validator");

const transactionController = {
  topUp: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { amount } = req.body;
    const email = req.user.email;

    userModel.topUpBalance(email, amount, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Gagal melakukan top up saldo" });
      }
      // Mencatat transaksi top up

      const transactionData = {
        transaction_type: "TOP UP",
        amount,
        description: "Top up saldo",
      };
      transactionModel.saveTransactionHistory(
        transactionData,
        (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Gagal mencatat transaksi" });
          }
          res.json({
            message: "Top up saldo berhasil",
            amount,
            invoiceNumber: result.invoiceNumber,
          });
        }
      );
    });
  },
  makePayment: async (req, res) => {
    const { service_code } = req.body;
    const id = req.user.id;

    try {
      const service = await new Promise((resolve, reject) => {
        serviceModel.getServiceByCode(service_code, (err, service) => {
          if (err) reject(err);
          else resolve(service);
        });
      });

      if (!service) {
        return res.status(404).json({ message: "Service tidak ditemukan" });
      }
      const total_amount = service.service_tariff;
      const user = await userModel.findById(id); // Gunakan await di sini

      if (!user || user.balance < total_amount) {
        return res.status(400).json({ message: "Saldo tidak mencukupi" });
      } // Proses transaksi
      const newBalance = user.balance - total_amount;
      console.log(total_amount);
      await userModel.updateBalance(id, newBalance);
      //   const invoice_number = transactionModel.saveTransactionHistory(); // Asumsikan fungsi ini ada dan dapat menghasilkan nomor invoice unik
      const transactionData = {
        transaction_type: "PAYMENT",
        amount: total_amount,
        description: `Pembayaran untuk ${service.service_name}`,
      };

      console.log(transactionData);
      transactionModel.saveTransactionHistory(
        transactionData,
        (err, result) => {
          if (err) {
            console.log(err);
            // Handle error
          } else {
            console.log("bisa");
            // Sukses, lakukan sesuatu dengan `result`
          }
        }
      );

      // Response
      res.json({
        status: 0,
        message: "Transaksi berhasil",
        data: {
          //   invoice_number,
          service_code,
          service_name: service.service_name,
          transaction_type: "PAYMENT",
          total_amount,
          created_on: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
  },
  getHistory: (req, res) => {
    transactionModel.getTransactionHistory((err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Terjadi kesalahan pada server" });
      }
      res.json({
        status: "success",
        data: result,
      });
    });
  },
};
module.exports = transactionController;
