const Note = require('../models/note.js');
const Datastore = require('nedb');

const db = new Datastore({ filename: './data/notes.db', autoload: true });

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
  let orderByOptions = {};

  if (orderBy === 'finishedBy') {
    orderByOptions = { finishedBy: sortOrder };
  } else if (orderBy === 'createDate') {
    orderByOptions = { createDate: sortOrder };
  } else if (orderBy === 'priority') {
    orderByOptions = { priority: sortOrder };
  }

  db.find({}).sort(orderByOptions).exec((err, notes) => {
    if (callback) {
      callback(err, notes);
    }
  });
}

module.exports = {
  add: insertNote,
  update: updateNote,
  delete: deleteNote,
  get: getNote,
  all: getAll,
};
