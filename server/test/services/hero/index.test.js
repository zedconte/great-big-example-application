'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('hero service', function() {
  it('registered the heros service', () => {
    assert.ok(app.service('heros'));
  });
});
