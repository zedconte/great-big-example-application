'use strict';

const service = require('feathers-mongoose');
const contact = require('./contact-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: contact,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/contact', service(options));

  // Get our initialize service to that we can bind hooks
  const contactService = app.service('/api/contact');

  // Set up our before hooks
  contactService.before(hooks.before);

  // Set up our after hooks
  contactService.after(hooks.after);
};
