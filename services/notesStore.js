const Datastore = require('nedb'),
db = new Datastore({ filename: './data/notes.db', autoload: true });

function Note(title, description, priority, finishedBy) {
  this.title = title;
  this.description = description;
  this.priority = priority;
  this.finishedBy = finishedBy
  this.finished = false;
  this.createDate = Date().now
}

function getNote(id, callback) {
  db.findOne({ _id: id }, function(err, note) {
    if (callback) {
      callback(err, note);
    }
  });
}

function insertNote(title, description, priority, finishedBy, callback) {
  const note = new Note(title, description, priority, finishedBy);
  db.insert(note, function(err, newNote) {
    if (callback) {
      callback(err, newNote);
    }
  });
}

function updateNote(note, callback) {
  db.update({ _id: note._id }, note, {}, function(err) {
    if (callback) {
      callback(err);
    }
  });
}

function deleteNote(id, callback) {
  db.remove({ _id: id }, {}, function(err) {
    if (callback) {
      callback(err);
    }
  });
}

function getAll(callback, orderBy = undefined) {
  if (orderBy === 'finishedBy') {
    db.find({}).sort({ finishedBy: -1 }).exec(function(err, notes) { if (callback) { callback(err, notes); } });
  } else if (orderBy === 'createDate') {
    db.find({}).sort({ createDate: -1 }).exec(function(err, notes) { if (callback) { callback(err, notes); } });
  } else if (orderBy === 'priority') {
    db.find({}).sort({ priority: -1 }).exec(function(err, notes) { if (callback) { callback(err, notes); } });
  } else {
    db.find({}).exec(function(err, notes) { if (callback) { callback(err, notes); } });
  }
}

module.exports = {add: insertNote, update: updateNote, delete: deleteNote, get: getNote, all: getAll};
