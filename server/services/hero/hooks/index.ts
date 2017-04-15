import * as globalHooks from '../../../hooks'
// import * as hooks from 'feathers-hooks';
// const auth = require('feathers-authentication').hooks;

const before = {
  all: [
    // auth.verifyToken(),
    // auth.populateUser(),
    // auth.restrictToAuthenticated()
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
