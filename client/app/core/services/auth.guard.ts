import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
// import { helpers } from '../config/helpers'
import { SocketService } from './socket.service';

@Injectable()
/**
 * AuthGuard service is to provide client side router authorization
 */
export class AuthGuard implements CanActivate {
  constructor(private _socketService: SocketService, private _router: Router) { }

  canActivate() {
    // if (this._socketService.isLogin()) return true
    // this._router.navigate(['/'])
    // return false
    return this._socketService.isLogin() || this._socketService.authenticate()
      .then(res => this._socketService.app.passport.verifyJWT(res.accessToken))
      .then(payload => this._socketService.app.service('users').get(payload.userId))
      .then(user => this._socketService.app.set('user', user))
      .then(res => true)
      .catch(err => {
        this._router.navigate(['/login']
        )
      })
  }
}

