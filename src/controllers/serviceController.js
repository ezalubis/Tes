const config = require("../../config/config");
const serviceModel = require("../models/serviceModel");

const serviceController = {
  getService: (_req, res) => {
    serviceModel.getAllService((data) => {
      res.json({
        status: 0,
        message: "sukses",
        data,
      });
    });
  },
};
module.exports = serviceController;
