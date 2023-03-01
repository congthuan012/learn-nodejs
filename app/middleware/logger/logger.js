const { format } = require('date-fns');
const { v4:uuid } = require('uuid');
const fs = require('fs');
const fsPromise = fs.promises;
const path = require('path');

const logEvent = async (message, fileName) => {
      const dateFormat = format(new Date(),'yyyy-MM-dd HH:mm:ss');
      const logItem = `${dateFormat}\t${uuid()}\t${message}\n`;

      //check dir exists
      const filePath = path.join(__dirname,'..','..', `logs`);

      try{
            if (!fs.existsSync(filePath)){
                  fsPromise.mkdir(filePath);
            }
      
            await fsPromise.appendFile(path.join(filePath,fileName),logItem);
      }catch(err){
            console.log(err);
      }
}

const requestLog = (req, res, next) => {
      logEvent(`${req.method}\t${req.url}\t${req.headers.origin}`,'request.log');
      
      console.log(`${req.method} ${req.path}`)

      next();
}

module.exports = { logEvent, requestLog };