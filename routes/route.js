const root = require('./root');
const admin = require('./admin');
const auth = require('./auth')
const verifyToken = require('../app/middleware/verify-token');

module.exports = (app) => {

      //index
      app.get('/',root);

      //user
      app.use('/admins',verifyToken,admin);

      //auth
      app.use('/auth',auth);

      //fallback
      app.all('*', (req, res, next) => {
            res.status(404);

            return res.json({ message:"Not Found" });
      })

}