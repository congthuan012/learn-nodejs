const root = require('./root');
const user = require('./user');
module.exports = (app) => {

      //index
      app.get('/',root);

      //user
      app.use('/users',user);

      //fallback
      app.all('*', (req, res, next) => {
            res.status(404);

            return res.json({ message:"Not Found" });
      })

}