const express = require('express');
const chalk = require('chalk');
const logger = require('morgan');
require('dotenv').config();
const methodOverride = require('method-override');
const PORT = process.env.PORT ? (process.env.PORT) : 3005;
const db = require('./db');
const app = express();
app.use(express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('index');
});



const authRouter = require('./routes/authRouter.js');
const movieRouter = require('./routes/movieRouter.js');
const reviewsRouter = require('./routes/reviewsRouter.js');
const favoriteRouter = require('./routes/favoriteRouter.js');
const usersRouter = require('./routes/usersRouter.js');


app.use("/", authRouter);
app.use('/movies',movieRouter);
app.use('/reviews', reviewsRouter);
app.use('/favorite', favoriteRouter);
app.use('/users', usersRouter);