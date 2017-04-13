
/* global io, window */
import { Injectable } from '@angular/core';

import * as feathers from 'feathers/client';
import * as socketio from 'feathers-socketio/client'
const hooks = require('feathers-hooks')
import * as authentication from 'feathers-authentication-client'
import reduxifyServices, { getServicesStatus } from 'feathers-reduxify-services';
import reduxifyAuthentication from 'feathers-reduxify-authentication';
const io = require('socket.io-client');
import superagent from 'superagent';
import rest from 'feathers-rest/client';

import { config } from '../../../config/config'

@Injectable()
export class FeathersService {
  // See feathers-reduxify-services::default
  mapServicePathsToNames = {
    users: 'users',
    messages: 'messages',
    logs: 'logs',
    config: 'config',
    // Do not change the following. Hardcoded path for custom service: human name for further use.
    '/verifyReset/:action/:value': 'verifyReset',
  };
  // See feathers-reduxify-services::getServicesStatus. Order highest priority msg first.
  prioritizedListServices = ['auth', 'users', 'verifyReset', 'messages', 'logs'];
  socket: any;
  app: any;
  feathersAuthentication: any;
  verifyResetRoute = '/verifyReset/:action/:value'; // must match what server uses
  verifyReset: any;
  feathersServices: any;
  // private host = `http://${config.host}:${config.port}${config.apiUrl}`;

  constructor() {
    this.socket = io();

    // Configure feathers-client
    this.app = feathers()
      // .configure(rest(config.apiUrl).superagent(superagent))
      .configure(socketio(this.socket))
      .configure(hooks())
      .configure(authentication({
        cookie: config.cookie,
        storageKey: config.storageKey,
        storage: window.localStorage, // store the token in localStorage and initially sign in with that
      }));

    // Reduxify feathers-authentication
    this.feathersAuthentication = reduxifyAuthentication(this.app,
      { isUserAuthorized: (user) => user.isVerified } // user must be verified to authenticate
    );

    // Configure services
    this.verifyReset = this.app.service(this.verifyResetRoute); // eslint-disable-line no-unused-vars

    // Reduxify feathers services
    this.feathersServices = reduxifyServices(this.app, this.mapServicePathsToNames);
  }

  // Convenience method to get status of feathers services, incl feathers-authentication
  getFeathersStatus = (servicesRootState, names = this.prioritizedListServices) =>
    getServicesStatus(servicesRootState, names);

}