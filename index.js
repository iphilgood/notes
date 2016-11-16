const express = require('express');
const hbs = require('express-hbs');
const bodyParser = require('body-parser');
const session = require('express-session');
const momentHandler = require('handlebars.moment');
const hbsHelpers = require('./helpers/hbs_helpers');

const app = express();
momentHandler.registerHelpers(hbs);

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
  if (req.query.orderBy && req.query.order) {
    const orderBy = req.query.orderBy;
    const order = req.query.order;

    req.session.orderBy = orderBy;
    req.session.order = order;
    req.session.orderReset = false;

    if (req.session.orderBy === orderBy && req.session.order === 'desc') {
      req.session.orderReset = true;
    }
  }

  if (req.query.reset) {
    req.session.orderBy = undefined;
    req.session.order = undefined;
  }

  next();
  /* eslint-enable no-param-reassign */
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
