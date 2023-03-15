const Admin = require("../models/Admin");
const appConfig = require("../../config/app");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const admin = await Admin.findOne({ username });

      if (!admin) {
        return res.status(400).json({ error: "Admin not found" });
      }

      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ _id: admin._id }, appConfig.key, {
        expiresIn: 60 * 60 * 24,
      });

      return res.json({
        token,
        user: {
          _id: admin._id,
          username: admin.username,
        },
        message: "You are now logged in!",
      });
    } catch (err) {
      return res.status(500).json({ message: "Server error!" });
    }
  },

  logout: async (req, res, next) => {
    const bearerToken = req.header("authorization");

    if (!bearerToken) return res.status(401).send("Access Denied");

    const token = bearerToken.split(" ")[1];

    if (!token) return res.status(401).send("Access Denied");

    //logout

    try {
      return res.json({
        message: "You are now logged out!",
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = AuthController;
