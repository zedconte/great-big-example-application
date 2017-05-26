import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Profile } from './profile.model';
import { slices } from '../util';
import { RESTService } from '../../services/rest.service';
import * as functions from '../entity/entity.functions';

@Injectable()
export class ProfileEffects {
    @Effect()
    private loadFromRemote$ = functions.loadFromRemote$(this.actions$, slices.PROFILE, this.dataService);
    @Effect()
    private updateToRemote$ = functions.updateToRemote$(this.actions$, slices.PROFILE, this.dataService, this.store);
    @Effect()
    private addToRemote$ = functions.addToRemote$(this.actions$, slices.PROFILE, this.dataService, this.store);

    constructor(
        private store: Store<Profile>,
        private actions$: Actions,
        private dataService: RESTService
    ) { }
}
