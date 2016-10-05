var express = require('express');
var app = express();
var Datastore = require('nedb')
  , db = new Datastore({ filename: 'db/notes.db', autoload: true });

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
