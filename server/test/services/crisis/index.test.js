'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('crisis service', function() {
  it('registered the crises service', () => {
    assert.ok(app.service('crises'));
  });
});
