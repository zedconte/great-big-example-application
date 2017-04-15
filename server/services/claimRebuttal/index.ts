'use strict';

import hooks from './hooks'
import ClaimRebuttalModel from './claim-rebuttal-model'
import { getModel, getService } from '../../../config/util'
const entity = 'claimRebuttal';

export default function () {
  const app = this;
  const service = getService(app);

  const options = {
    Model: getModel(app, entity, ClaimRebuttalModel),
    paginate: {
      default: 5,
      max: 700
    },
    lean: true
  };

  app.use(`/api/${entity}`, service(options));
  const entityService = app.service(`/api/${entity}`);
  entityService.before(hooks.before);
  entityService.after(hooks.after);
};
