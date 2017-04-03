'use strict';

const service = require('feathers-mongoose');
const claimRebuttal = require('./claimRebuttal-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: claimRebuttal,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/claimRebuttal', service(options));

  // Get our initialize service to that we can bind hooks
  const claimRebuttalService = app.service('/api/claimRebuttal');

  // Set up our before hooks
  claimRebuttalService.before(hooks.before);

  // Set up our after hooks
  claimRebuttalService.after(hooks.after);
};
