'use strict';

const service = require('feathers-mongoose');
import hooks from './hooks'
import RebuttalModel from './rebuttal-model'

export default function() {
  const app = this;

  const options = {
    Model: RebuttalModel,
    paginate: {
      default: 5,
      max: 25
    },
    lean: true
  };

  app.use('/api/rebuttal', service(options));
  const rebuttalService = app.service('/api/rebuttal');
  rebuttalService.before(hooks.before);
  rebuttalService.after(hooks.after);
};
