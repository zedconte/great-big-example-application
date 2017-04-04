'use strict';
const note = require('./note');
const recipe = require('./recipe');
const authentication = require('./authentication');
const user = require('./user');

module.exports = function() {
  const app = this;


  app.configure(authentication);
  app.configure(user);
  app.configure(recipe);
  app.configure(note);
};
