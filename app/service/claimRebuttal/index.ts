const service = require('feathers-mongoose');
import hooks from './hooks'
import ClaimRebuttalModel from './claim-rebuttal-model'

export default function() {
  const app = this;

  let options = {
    Model: ClaimRebuttalModel,
    paginate: {
      default: 100,
      max: 200
    },
    lean: true
  };

  app.use('/api/claimrebuttal', service(options));
  const claimRebuttalService = app.service('/api/claimrebuttal');
  claimRebuttalService.before(hooks.before);
  claimRebuttalService.after(hooks.after);
};
