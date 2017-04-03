'use strict';

const service = require('feathers-mongoose');
const rebuttal = require('./rebuttal-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: rebuttal,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/rebuttal', service(options));

  // Get our initialize service to that we can bind hooks
  const rebuttalService = app.service('/api/rebuttal');

  // Set up our before hooks
  rebuttalService.before(hooks.before);

  // Set up our after hooks
  rebuttalService.after(hooks.after);
};
