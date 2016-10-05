const express = require('express');
const app = express();
const notes = require('./api/notes');

app.use('/notes', notes);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
