const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const userModel = require("../models/authmodel");
const config = require("../../config/config");

const authController = {
  register: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, first_name, last_name, password } = req.body;
    userModel.findUserByEmail(email, (user) => {
      if (user) {
        return res.status(400).send("Email already exists.");
      } else {
        userModel.createUser(email, first_name, last_name, password, () => {
          res.status(200).send({
            status: "0",
            message: "Registrasi berhasil silahkan login",
            data: "null",
          });
        });
      }
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    userModel.findUserByEmail(email, (user) => {
      if (!user) {
        return res.status(400).send({
          status: 102,
          message: "Paramter email tidak sesuai format",
          data: null,
        });
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign({ id: user.id }, config.jwtSecret, {
            expiresIn: "12h",
          });
          res.json({
            status: 0,
            message: "Login Sukses",
            data: {
              token: token,
            },
          });
        } else {
          return res.status(400).send({
            status: 103,
            message: "password salah",
            data: null,
          });
        }
      });
    });
  },
  getProfile: (req, res) => {
    const userId = req.user.id;
    userModel.findById(userId, (error, user) => {
      if (error) {
        return res.status(500).send("There was a problem finding the user.");
      }
      if (!user) {
        return res.status(404).send("No user found.");
      }
      res.status(200).json({
        status: 0,
        message: "Sukses",
        data: {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          profile_image: user.profile_image,
        },
      });
    });
  },
  updateProfile: function (req, res) {
    const id = req.user.id;
    const updatedData = {
      profile_image: req.file ? req.file.path : null,
    };
    userModel.updateUserById(id, updatedData, (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(200).json({
        message: "Profile updated successfully",
        data: updatedData,
      });
    });
  },
  updateProfileName: (req, res) => {
    const id = req.user.id;
    const updatedData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    };
    userModel.updateNameById(id, updatedData, (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(200).json({
        message: "Profile updated successfully",
        data: updatedData,
      });
    });
  },
  getBalance: (req, res) => {
    const userId = req.user.id;
    userModel.findById(userId, (error, user) => {
      if (error) {
        return res.status(500).send("There was a problem finding the user.");
      }
      if (!user) {
        return res.status(404).send("No user found.");
      }
      res.status(200).json({
        status: 0,
        message: "Get Balance Succesfully",
        data: {
          balance: user.balance,
        },
      });
    });
  },
};

module.exports = authController;
