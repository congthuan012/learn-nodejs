const Admin = require('../models/Admin');
const appConfig = require('../../config/app');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthController = {
      login: async (req, res) => {
            const { username, password } = req.body;

            const admin = await Admin.findOne({ username });

            if (!admin) {
                  return res.status(400).json({ error: 'Admin not found' });
            }

            const isMatch = await bcrypt.compare(password, admin.password);

            if (!isMatch) {
                  return res.status(400).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({_id: admin._id}, appConfig.key, { expiresIn: 60 * 60 * 24 });

            return res.json({
                  token,
                  user: {
                        _id: admin._id,
                        username: admin.username
                  },
                  message: 'You are now logged in!'
            });
      }
}

module.exports = AuthController;