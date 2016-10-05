const store = require('../services/notesStore');

module.exports.getNotes = function(req, res) {
  store.all(function(err, notes) {
    res.format({
        'text/html': function() {
            res.render("notes/index", notes);
        },
        'application/json': function() {
            res.send(notes);
        },
    });
  });
}

module.exports.newNote = function(req, res) {
  res.format({
        'text/html': function() {
            res.render("notes/new");
        },
        'application/json': function() {
            res.send({});
        },
    });
}

module.exports.createNote = function(req, res) {
  store.add(req.body.title, req.body.description,
            req.body.priority, req.body.finishedBy, function (err, newNote) {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
}

module.exports.getNote = function(req, res) {
  store.get(req.params.id, function(err, note) {
    res.format({
        'text/html': function(){
            res.render("notes/edit", note);
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
