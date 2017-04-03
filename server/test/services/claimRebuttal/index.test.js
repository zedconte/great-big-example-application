'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('claimRebuttal service', function() {
  it('registered the claimRebuttals service', () => {
    assert.ok(app.service('claimRebuttals'));
  });
});
