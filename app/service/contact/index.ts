'use strict';

const service = require('feathers-mongoose');
import hooks from './hooks'
import ContactModel from './contact-model'
import { getModel } from '../../../config/util'
const entity = 'contact';

export default function () {
  const app = this;

  const options = {
    Model: ContactModel,
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
