const { logEvent } = require('./logger');
const errorHandler = (err, req, res, next) => {
      logEvent(`${err.name}\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,'error.log');

      console.log(err.stack);
      const status = res.statusCode??500;
      res.status(status);
      res.json({message:err.message??"Server error"});
}

module.exports = errorHandler;