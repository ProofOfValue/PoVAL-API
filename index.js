'use strict';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const api = require('./api/index');
const app = express();

/*******************************************************************************
MIDDLEWARE
*******************************************************************************/

// Use Morgan request logger
app.use(logger(app.get("env") === "production" ? "combined" : "dev"));

// For parsing application/json
app.use(bodyParser.json());

// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Allow client applications from other domains use API Server (CORS)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*******************************************************************************
API
*******************************************************************************/

app.use('/', api);

/*******************************************************************************
SETUP
*******************************************************************************/

// Set env, host, and port
app.set("env", process.env.NODE_ENV || "development");
app.set("host", process.env.HOST || "0.0.0.0");
app.set("port", process.env.PORT || 5000);

// Listen on port
app.listen(app.get("port"), function () {
    console.log('\n' + '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('~ PoVal API running on port ' + app.get("port") + ' ~');
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~' + '\n');
});

/*******************************************************************************
ERROR HANDLING
*******************************************************************************/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler, will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status( err.code || 500 )
        .json({
            status: 'error',
            message: err
        });
    });
}

// production error handler, will NOT print stacktrace
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .json({
        status: 'error',
        message: err.message
    });
});

/*******************************************************************************
EXPORTS
*******************************************************************************/
module.exports = app;
