#!/usr/bin/env node
if (process.env.NODE_ENV !== 'production') {
  if (
    !require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json$)/i
    })
  ) {
    return;
  }
}
require('../server.babel'); // babel registration (runtime transpilation for node)

const PrettyError = require('pretty-error');

const pretty = new PrettyError();

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise ', p, pretty.render(reason));
});

const app = require('../api/app');

if (process.env.APIPORT) {
  app.listen(process.env.APIPORT, err => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', process.env.APIPORT);
    console.info('==> 💻  Send requests to http://localhost:%s', process.env.APIPORT);
  });
} else {
  console.error('==>     ERROR: No APIPORT environment variable has been specified');
}
