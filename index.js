const express = require('express');
const hbs = require('express-hbs');
const bodyParser = require('body-parser');
const session = require('express-session');
const MomentHandler = require('handlebars.moment');

const app = express();
MomentHandler.registerHelpers(hbs);

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  partialsDir: `${__dirname}/views/partials`,
  layoutsDir: `${__dirname}/views/layout`,
}));

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use(session({
  secret: 'iminlovewiththecoco',
  resave: false,
  saveUninitialized: true,
}));

// Middleware for session handling
app.use((req, res, next) => {
  /* eslint-disable no-param-reassign */
  // Style
  if (!req.session.style) { req.session.style = 'light'; }
  if (req.query.style) { req.session.style = req.query.style; }

  // Filter
  if (!req.session.filter) { req.session.filter = false; }
  if (req.query.filter) { req.session.filter = req.query.filter; }

  // Ordering
  if (req.query.orderBy) {
    const orderBy = req.query.orderBy;

    if (req.session.orderBy === orderBy) {
      const order = parseInt(req.session.order, 10);
      if (order === 1) {
        req.session.order = -1;
        req.session.orderBy = orderBy;
      } else if (order === -1) {
        req.session.order = undefined;
        req.session.orderBy = undefined;
      }
    } else {
      req.session.orderBy = orderBy;
      req.session.order = 1;
    }
  }

  /* eslint-enable no-param-reassign */
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('method-override')((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
  return undefined;
}));

app.use('/', require('./routes/notesRoutes'));

app.use(express.static(`${__dirname}/public`));

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000');
});

hbs.registerHelper('if_eq', function (a, b, opts) {
  if (a === b) {
    return opts.fn(this);
  }
  return opts.inverse(this);
});

hbs.registerHelper('times', (n, block) => {
  let accum = '';
  for (let i = 0; i < n; i += 1) {
    accum += block.fn(i);
  }
  return accum;
});
