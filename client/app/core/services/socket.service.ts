import * as feathers from 'feathers/client'
import * as socketio from 'feathers-socketio/client'
const io = require('socket.io-client')
const hooks = require('feathers-hooks')
import * as authentication from 'feathers-authentication-client'

import RxJS from 'rxjs'

import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { helpers } from '../../../config/helpers'
import { config } from '../../../config/config'
import { FeathersService } from './feathers.service';

@Injectable()
export class SocketService {
    public socket: any
    public app: any

    constructor(feathersService: FeathersService) {
        this.socket = io(helpers.getHost())
        this.app = feathersService.app;
    }

    getService(service) {
        return this.app.service(service)
    }

    authenticate(option?: any) {
        return this.app.authenticate(option)
    }

    logout() {
        // feathers-authentication-client will bind logout method to app
        // app.logout = app.passport.logout.bind(app.passport);
        return this.app.logout()
    }

    getUser() {
        return this.app.get('user')
    }

    getToken() {
        return this.app.get('token')
    }

    isLogin() {
        return this.getUser() ? true : false
    }
}


