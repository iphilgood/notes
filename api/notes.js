var express = require('express');
var router = express.Router();
var Datastore = require('nedb')
  , db = new Datastore({ filename: 'db/notes.db', autoload: true });

router.use(function timeLog(req, res, next) {
  console.log('notes api accessed');
  next();
});

router.get('/', function(req, res) {
  res.send('Notes home page');
});

router.get('/about', function(req, res) {
  res.send('About notes');
});

module.exports = router;
