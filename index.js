require('dotenv').config();
const express = require('express');
const PORT = process.env.APP_PORT || 3500;
const app = express();
const path = require('path');
const routes = require('./routes/route');
const { requestLog } = require('./app/middleware/logger/logger');
const errorHandler = require('./app/middleware/logger/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const mongoConnect = require('./db/mongo-connect');
const mongoose = require('mongoose');
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

//connect to db
mongoConnect(mongoose);

app.use(requestLog);

app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.use(errorHandler);

mongoose.connection.once('open',() => {
      console.log('Connected to MongoDB');
      app.listen(PORT, () =>{ console.log(`App is running in port ${PORT}`) });
})

mongoose.connection.on('error', err => {
      console.log('Error connecting to mongo', err);
})