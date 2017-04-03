'use strict';

const service = require('feathers-mongoose');
const hero = require('./hero-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: hero,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/hero', service(options));

  // Get our initialize service to that we can bind hooks
  const heroService = app.service('/api/hero');

  // Set up our before hooks
  heroService.before(hooks.before);

  // Set up our after hooks
  heroService.after(hooks.after);
};
