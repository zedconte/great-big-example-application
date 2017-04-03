'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('claim service', function() {
  it('registered the claims service', () => {
    assert.ok(app.service('claims'));
  });
});
