require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors(
  {
    origin: process.env.APP_URL,
    credentials: true,
  },
));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

require('./auth');

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

const usersRouter = require('../users/controllers');
app.use('/api/users', usersRouter);

const errorHandler = require('../middlewares/error-handler');
app.use(errorHandler);

module.exports = app;
