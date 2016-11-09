const store = require('../services/notesStore');
const moment = require('moment');

module.exports.getNotes = function(req, res, next) {
  const session = req.session
  console.log(session.filter)
  store.all(function(err, notes) {
    res.format({
      'text/html': function() {
        res.render('notes/index', { style: session.style, orderBy: session.orderBy, filter: session.filter, notes });
      },
      'application/json': function() {
        res.send(notes);
      },
    });
  }, req.session.orderBy);
}

module.exports.newNote = function(req, res, next) {
  const defaultNote = { finishedBy: moment().format('MM/DD/YYYY') };
  res.format({
    'text/html': function() {
      res.render('notes/new', { style: req.session.style, note: defaultNote });
    },
    'application/json': function() {
      res.send(defaultNote);
    },
  });
}

module.exports.createNote = function(req, res) {
  store.add(req.body.title, req.body.description, req.body.priority, req.body.finishedBy, function (err, newNote) {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
}

module.exports.getNote = function(req, res, next) {
  store.get(req.params.id, function(err, note) {
    res.format({
      'text/html': function(){
        res.render('notes/edit', { style: req.session.style, note: note });
      },
      'application/json': function(){
        res.json(note);
      },
    });
  });
}

module.exports.editNote = function(req, res) {
  store.update(req.body, function(err) {
    if (err) {
      console.log(err);
    }

    res.redirect('/');
  });
}

module.exports.deleteNote = function(req, res) {
  store.delete(req.params.id, function(err) {
    if (err) {
      console.log(err);
    }

    res.redirect('/');
  });
}
