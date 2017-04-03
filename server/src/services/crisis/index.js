'use strict';

const service = require('feathers-mongoose');
const crisis = require('./crisis-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: crisis,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/crisis', service(options));

  // Get our initialize service to that we can bind hooks
  const crisisService = app.service('/api/crisis');

  // Set up our before hooks
  crisisService.before(hooks.before);

  // Set up our after hooks
  crisisService.after(hooks.after);
};
