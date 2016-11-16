const store = require('../services/notesStore');
const moment = require('moment');

const orderOptions = [
  {
    condition: 'finishedBy',
    btnText: 'By finished by',
  },
  {
    condition: 'createDate',
    btnText: 'By created at',
  },
  {
    condition: 'priority',
    btnText: 'By priority',
  },
];

module.exports.getNotes = (req, res) => {
  const session = req.session;
  store.all((err, notes) => {
    res.format({
      'text/html': () => {
        res.render('notes/index', {
          style: session.style,
          orderOptions,
          orderBy: session.orderBy,
          order: session.order,
          orderReset: session.orderReset,
          filter: session.filter,
          notes,
        });
      },
    });
  }, req.session.orderBy, req.session.order);
};

module.exports.newNote = (req, res) => {
  const defaultNote = { finishedBy: moment().format('YYYY-MM-DD') };
  res.format({
    'text/html': () => {
      res.render('notes/new', { style: req.session.style, note: defaultNote });
    },
  });
};

module.exports.createNote = (req, res) => {
  const finishedBy = new Date(req.body.finishedBy);
  store.add(
    req.body.title,
    req.body.description,
    req.body.priority,
    finishedBy, (err) => {
      if (err) {
        console.log(err);
      }
      res.redirect('/');
    });
};

module.exports.getNote = (req, res) => {
  store.get(req.params.id, (err, note) => {
    const noteCopy = note;
    noteCopy.finishedBy = moment(note.finishedBy).format('YYYY-MM-DD');
    res.format({
      'text/html': () => {
        res.render('notes/edit', { style: req.session.style, note });
      },
    });
  });
};

module.exports.editNote = (req, res) => {
  const note = req.body;
  note.finishedBy = new Date(note.finishedBy);
  store.update(note, (err) => {
    if (err) {
      console.log(err);
    }

    res.redirect('/');
  });
};

module.exports.deleteNote = (req, res) => {
  store.delete(req.params.id, (err) => {
    if (err) {
      console.log(err);
    }

    res.redirect('/');
  });
};
