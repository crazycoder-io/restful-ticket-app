import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser'

/**
 * Routers
 */

import indexRouter from'./routes/index';
import trainRouter from './routes/trains';
import voyageRouter from './routes/voyage';
import ticketRouter from './routes/ticket';
import passengerRouter from './routes/passenger';
import salesRouter from './routes/sales';

const app = express();

/**
 * dotenv configuration
 */

import dotenv from 'dotenv';
dotenv.config();

/**
 * db configuration
 */

import db from './helpers/db';
db();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/trains', trainRouter);
app.use('/voyages', voyageRouter);
app.use('/tickets', ticketRouter);
app.use('/passenger', passengerRouter);
app.use('/sales', salesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;