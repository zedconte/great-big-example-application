'use strict';

import hooks from './hooks'
import RebuttalModel from './rebuttal-model'
import { getModel, getService } from '../../../config/util'
const entity = 'rebuttal';

export default function () {
  const app = this;
  const service = getService(app);

  const options = {
    Model: getModel(app, entity, RebuttalModel),
    paginate: {
      default: 5,
      max: 25
    },
    lean: true
  };

  app.use(`/api/${entity}`, service(options));
  const entityService = app.service(`/api/${entity}`);
  entityService.before(hooks.before);
  entityService.after(hooks.after);
};
