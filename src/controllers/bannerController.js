const config = require("../../config/config");
const bannerModel = require("../models/bannerModel");

const bannerController = {
  getBanner: (_req, res) => {
    bannerModel.getAllBanner((data) => {
      res.json({
        status: 0,
        message: "sukses",
        data,
      });
    });
  },
};
module.exports = bannerController;
