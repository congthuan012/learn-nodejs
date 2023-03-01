const dbConfig = require('../config/db');

const connectDB = async (mongoose) => {
      try{
            const port = dbConfig.port?':'+dbConfig.port:'';
            await mongoose.connect(`mongodb+srv://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}${port}/${dbConfig.name}`);
      }catch(err){
            console.log(err);
      }
}

module.exports = connectDB;