'use strict';

global.APP_ROOT = require('path').join(__dirname + '/');

let express = require('express'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    app = express();

let AppController = require('./controller/AppController');

app.set('json replacer', null);
app.set('json spaces', false);
app.set('port', process.env.PORT || 3000);

app.disable('etag');
app.disable('x-powered-by');

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());

app.use(require('./router'));

app.use(AppController.notFound);
app.use(AppController.errorHandler);

module.exports = app;
