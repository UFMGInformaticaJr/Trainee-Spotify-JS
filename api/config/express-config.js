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

require('./auth.js');

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

const usersRouter = require('../src/domains/users/controllers');
app.use('/api/users', usersRouter);

const artistRouter = require('../src/domains/artists/controllers');
app.use('/api/artists', artistRouter);

const songsRouter = require('../src/domains/songs/controllers');
app.use('api/songs', songsRouter);


const errorHandler = require('../src/middlewares/error-handler');
app.use(errorHandler);

module.exports = app;
