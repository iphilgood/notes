const express = require('express')
const hbs = require('express-hbs')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const MomentHandler = require('handlebars.moment')
MomentHandler.registerHelpers(hbs)

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layout'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(session({
  secret: 'iminlovewiththecoco',
  resave: false,
  saveUninitialized: true
}))

// Middleware for session handling
app.use(function (req, res, next) {
  // Style
  if (!req.session.style) { req.session.style = 'light' }
  if (req.query.style) { req.session.style = req.query.style }

  // Filter
  if (!req.session.filter) { req.session.filter = false }
  if (req.query.filter) { req.session.filter = req.query.filter }

  // Ordering
  if (req.query.orderBy) {
    const orderBy = req.query.orderBy

    if (req.session.orderBy === req.query.orderBy) {
      const order = parseInt(req.session.order)
      if (order === 1) {
        req.session.order = -1
        req.session.orderBy = orderBy
      } else if (order === -1) {
        req.session.order = undefined
        req.session.orderBy = undefined
      }
    } else {
      req.session.orderBy = orderBy
      req.session.order = 1
    }
  }

  next()
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(require('method-override')(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('/', require('./routes/notesRoutes'));

app.use(express.static(__dirname + '/public'))

app.listen(3000, function () {
  console.log('Example app listening at http://localhost:3000');
});

hbs.registerHelper('if_eq', function(a, b, opts) {
  if (a == b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

hbs.registerHelper('times', function(n, block) {
  var accum = '';
  for(var i = 0; i < n; ++i) {
    accum += block.fn(i);
  }
  return accum;
});
