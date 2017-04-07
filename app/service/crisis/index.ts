'use strict';

const service = require('feathers-mongoose');
import hooks from './hooks'
import CrisisModel from './crisis-model'

export default function() {
  const app = this;

  const options = {
    Model: CrisisModel,
    paginate: {
      default: 5,
      max: 25
    },
    lean: true
  };

  app.use('/api/crisis', service(options));
  const crisisService = app.service('/api/crisis');
  crisisService.before(hooks.before);
  crisisService.after(hooks.after);
};
