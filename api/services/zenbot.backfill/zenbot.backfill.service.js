// Initializes the `zenbot.backfill` service on path `/zenbot-backfill`
const createService = require('./zenbot.backfill.class.js');
const hooks = require('./zenbot.backfill.hooks');

module.exports = function (app) {
  const { paginate } = app.get('paginate');

  const options = {
    paginate
  };
  // Initialize our service with any options it requires
  app.use('/zenbot-backfill', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('zenbot-backfill');

  service.hooks(hooks);
};
