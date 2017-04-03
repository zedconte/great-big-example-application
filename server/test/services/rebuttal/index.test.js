'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('rebuttal service', function() {
  it('registered the rebuttals service', () => {
    assert.ok(app.service('rebuttals'));
  });
});
