'use strict';

const service = require('feathers-mongoose')
import hooks from './hooks'
import ClaimModel from './claim-model'

export default function() {
  const app = this;

  const options = {
    Model: ClaimModel,
    id: 'id',
    paginate: {
      default: 100,
      max: 200
    },
    lean: true
  };

  app.use('/api/claim', service(options));
  const claimService = app.service('/api/claim');
  claimService.before(hooks.before);
  claimService.after(hooks.after);
};
