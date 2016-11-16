const Datastore = require('nedb');
const moment = require('moment');

const db = new Datastore({ filename: './data/notes.db', autoload: true });

function Note(title, description, priority, finishedBy) {
  this.title = title;
  this.description = description;
  this.priority = priority;
  this.finishedBy = finishedBy;
  this.finished = false;
  this.createDate = moment().format('YYYY-MM-DD');
}

function getNote(id, callback) {
  db.findOne({ _id: id }, (err, note) => {
    if (callback) {
      callback(err, note);
    }
  });
}

function insertNote(title, description, priority, finishedBy, callback) {
  const note = new Note(title, description, priority, finishedBy);
  db.insert(note, (err, newNote) => {
    if (callback) {
      callback(err, newNote);
    }
  });
}

function updateNote(note, callback) {
  /* eslint-disable no-underscore-dangle */
  const noteToUpdate = note;
  const isFinished = noteToUpdate.finished !== undefined;
  noteToUpdate.finished = isFinished;
  db.update({ _id: note._id }, note, {}, (err) => {
    if (callback) {
      callback(err);
    }
  });
  /* eslint-enable no-underscore-dangle */
}

function deleteNote(id, callback) {
  db.remove({ _id: id }, {}, (err) => {
    if (callback) {
      callback(err);
    }
  });
}

function getAll(callback, orderBy = undefined, order = undefined) {
  const sortOrder = order === 'asc' ? 1 : -1;
  if (orderBy === 'finishedBy') {
    db.find({}).sort({ finishedBy: sortOrder }).exec((err, notes) => {
      if (callback) {
        callback(err, notes);
      }
    });
  } else if (orderBy === 'createDate') {
    db.find({}).sort({ createDate: sortOrder }).exec((err, notes) => {
      if (callback) {
        callback(err, notes);
      }
    });
  } else if (orderBy === 'priority') {
    db.find({}).sort({ priority: sortOrder }).exec((err, notes) => {
      if (callback) {
        callback(err, notes);
      }
    });
  } else {
    db.find({}).exec((err, notes) => {
      if (callback) {
        callback(err, notes);
      }
    });
  }
}

module.exports = {
  add: insertNote,
  update: updateNote,
  delete: deleteNote,
  get: getNote,
  all: getAll,
};
