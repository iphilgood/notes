var express = require('express');
var router = express.Router();
var Datastore = require('nedb')
  , db = new Datastore({ filename: 'db/notes.db', autoload: true });

router.get('/', function(req, res) {
  const notes = db.find({}, function (err, docs) {
    if (err) {
      res.send(err);
    } else {
      res.send(docs);
    }
  });
});

router.get('/:id', function(req, res) {
  db.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

router.post('/', function(req, res) {
  const note = req.body
  db.insert(note, function (err, newDoc) {
    if (err) {
      res.send(err);
    } else {
      res.send(newDoc);
    }
  });
});

router.put('/', function(req, res) {
  const note = req.body;
  db.update({ _id: note._id }, note, {}, function(err, numReplaced) {
    if (err) {
      res.send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete('/:id', function(req, res) {
  db.remove({ _id: req.params.id }, {}, function(err, numRemoved) {
    if (err) {
      res.send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
