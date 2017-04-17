
/* global io, window */
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable'
import * as feathers from 'feathers/client';
import * as socketio from 'feathers-socketio/client'
import rest from 'feathers-rest/client';
const hooks = require('feathers-hooks')
import * as authentication from 'feathers-authentication-client'
import reduxifyServices, { getServicesStatus } from 'feathers-reduxify-services';
import reduxifyAuthentication from 'feathers-reduxify-authentication';
const io = require('socket.io-client');
import superagent from 'superagent';

import { config } from '../../../config/config'

@Injectable()
export class FeathersService {
  // See feathers-reduxify-services::default
  mapServicePathsToNames = {
    user: 'users',
    message: 'message',
    logs: 'logs',
    config: 'config',
    // Do not change the following. Hardcoded path for custom service: human name for further use.
    '/verifyReset/:action/:value': 'verifyReset',
  };
  // See feathers-reduxify-services::getServicesStatus. Order highest priority msg first.
  prioritizedListServices = ['auth', 'users', 'verifyReset', 'message', 'logs'];
  socket: any;
  socketApp: any;
  restApp: any;
  feathersAuthentication: any;
  verifyResetRoute = '/verifyReset/:action/:value'; // must match what server uses
  verifyReset: any;
  services: any;
  // private host = `http://${config.host}:${config.port}${config.apiUrl}`;

  constructor() {
    this.socket = io();

    // Configure feathers-client for websockets
    this.socketApp = feathers()
      .configure(socketio(this.socket))
      .configure(hooks())
      .configure(authentication({
        cookie: config.cookie,
        storageKey: config.storageKey,
        storage: window.localStorage, // store the token in localStorage and initially sign in with that
      }));

    // Configure feathers-client for REST
    this.restApp = feathers()
      .configure(rest(config.apiUrl).superagent(superagent))
      .configure(hooks())
      .configure(authentication({
        cookie: config.cookie,
        storageKey: config.storageKey,
        storage: window.localStorage, // store the token in localStorage and initially sign in with that
      }));

    // Reduxify feathers-authentication
    this.feathersAuthentication = reduxifyAuthentication(this.socketApp,
      //  { isUserAuthorized: (user) => user.isVerified } // user must be verified to authenticate
    );

    // Configure services
    this.verifyReset = this.socketApp.service(this.verifyResetRoute); // eslint-disable-line no-unused-vars

    // Reduxify feathers services
    this.services = reduxifyServices(this.socketApp, this.mapServicePathsToNames, {});
    observablifyServices(this.services)
  }

  // Convenience method to get status of feathers services, incl feathers-authentication
  getFeathersStatus = (servicesRootState, names = this.prioritizedListServices) =>
    getServicesStatus(servicesRootState, names);

}

function observablifyServices(services) {
  for (let prop in services) {
    let service = services[prop];
    service._observable = {};
    service.resource$ = new Observable(observable => service._observable = observable)
    service.on('created', res => {
      service._observable.next({
        type: 'created',
        entities: res.data
      });
    });
    service.on('find', res => {
      service._observable.next({
        type: 'find',
        entities: res.data
      });
    });
  }
}
