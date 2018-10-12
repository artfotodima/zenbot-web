import express from '@feathersjs/express';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio';
import morgan from 'morgan';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
// import config from './config';
import services from './services';
import channels from './channels';
import mongooseClient from './mongoose.service';

const path = require('path');

// we need to set path for @feathersjs/configuration
process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config/');
const configuration = require('@feathersjs/configuration');

const favicon = require('serve-favicon');
const appHooks = require('../api/app.hooks');
const logger = require('./logger');

const app = express(feathers());
app.configure(configuration());

// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());

app
  // .set('config', config)
  .use(morgan('dev'))
  .use(cookieParser())
  .use(
    session({
      secret: 'react and redux rule!!!!',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    })
  )
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json());


app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));


// Core
app
  .configure(express.rest())
  .configure(socketio({ path: '/ws' }))
  .configure(mongooseClient)
  .configure(services)
  .configure(channels)
  // Final handlers
  .use(express.notFound())
  .use(express.errorHandler({ logger }))
  .hooks(appHooks);


module.exports = app;
