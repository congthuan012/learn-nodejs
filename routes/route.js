const root = require('./root');
const admin = require('./admin');
module.exports = (app) => {

      //index
      app.get('/',root);

      //user
      app.use('/admins',admin);

      //fallback
      app.all('*', (req, res, next) => {
            res.status(404);

            return res.json({ message:"Not Found" });
      })

}