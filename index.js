const express = require('express');
const hbs = require('express-hbs');
const app = express();
const bodyParser = require('body-parser');

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layout'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(require("method-override")(function(req, res){
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
