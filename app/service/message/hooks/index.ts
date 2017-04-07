import * as globalHooks from '../../../hooks'
// import * as hooks from 'feathers-hooks';

const before = {
  all: [
    // auth.hooks.authenticate('jwt')
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}

const after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}

export default {
  before,
  after
}
