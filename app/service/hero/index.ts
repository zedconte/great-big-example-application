'use strict';

const service = require('feathers-mongoose');
import hooks from './hooks'
import HeroModel from './hero-model'

export default function() {
  const app = this;

  const options = {
    Model: HeroModel,
    paginate: {
      default: 5,
      max: 25
    },
    lean: true
  };

  app.use('/api/hero', service(options));
  const heroService = app.service('/api/hero');
  heroService.before(hooks.before);
  heroService.after(hooks.after);
};
