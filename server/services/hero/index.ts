'use strict';

import hooks from './hooks'
import HeroModel from './hero-model'
import { getModel, getService } from '../../../config/util'
const entity = 'hero';

export default function () {
  const app = this;
  const service = getService(app);

  const options = {
    Model: getModel(app, entity, HeroModel),
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
