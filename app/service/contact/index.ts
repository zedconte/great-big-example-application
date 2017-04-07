'use strict';

const service = require('feathers-mongoose');
import hooks from './hooks'
import ContactModel from './contact-model'

export default function() {
  const app = this;

  const options = {
    Model: ContactModel,
    paginate: {
      default: 5,
      max: 25
    },
    lean: true
  };

  app.use('/api/contact', service(options));
  const contactService = app.service('/api/contact');
  contactService.before(hooks.before);
  contactService.after(hooks.after);
};
