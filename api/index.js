'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.status(200).json('PoVAL');
});

router.get('/api', function(req, res, next) {
    res.status(200).json('PoVAL API v0.1.0');
      // .json({
      //   status: 'success',
      //   message: 'Live long and prosper!'
      // });
});

module.exports = router;
