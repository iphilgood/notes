const hbs = require('express-hbs');
const moment = require('moment');

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

hbs.registerHelper('has_passed', function (finishedBy, options) {
  const isAfter = moment(finishedBy).add(1, 'day').isBefore(moment());
  if (isAfter) {
    return options.fn(this);
  }
  return options.inverse(this);
});
