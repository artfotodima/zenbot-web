// Initializes the `zenbot.sim` service on path `/zenbot-sim`
const createService = require('./zenbot.sim.class.js');
const hooks = require('./zenbot.sim.hooks');

module.exports = function (app) {
  const { paginate } = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/zenbot-sim', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('zenbot-sim');

  service.hooks(hooks);
};
