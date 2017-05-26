import { createSelector } from 'reselect';

import { Profile, initialProfile } from './profile.model';
import { Entities, initialEntities } from '../entity/entity.model';
import { slices } from '../util';
import * as functions from '../entity/entity.functions';
import { typeFor } from '../util';
import { actions, EntityAction } from '../entity/entity.actions';

export function reducer(state: Entities<Profile> = initialEntities<Profile>({}, slices.PROFILE, actions, initialProfile),
    action: EntityAction<Profile>): Entities<Profile> {

    switch (action.type) {
        case typeFor(slices.PROFILE, actions.ADD_SUCCESS):
            return functions.addSuccess<Profile>(state, <any>action);
        case typeFor(slices.PROFILE, actions.ADD_TEMP):
        case typeFor(slices.PROFILE, actions.LOAD_SUCCESS):
            return functions.addToStore<Profile>(state, <any>action);
        case typeFor(slices.PROFILE, actions.UPDATE):
        case typeFor(slices.PROFILE, actions.UPDATE_SUCCESS):
            return functions.update<Profile>(state, <any>action);
        case typeFor(slices.PROFILE, actions.DELETE):
            return functions.deleteEntity<Profile>(state, <any>action);
        case typeFor(slices.PROFILE, actions.DELETE_TEMP):
            return functions.deleteTemp<Profile>(state, <any>action);
        case typeFor(slices.PROFILE, actions.SELECT):
            return functions.select<Profile>(state, <any>action);
        case typeFor(slices.PROFILE, actions.SELECT_NEXT):
            return functions.selectNext<Profile>(state, <any>action);
        default:
            return state;
    }
};

export const getEntities = (state: Entities<Profile>) => state.entities;

export const getIds = (state: Entities<Profile>) => state.ids;

export const getSelectedId = (state: Entities<Profile>) => state.selectedEntityId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return entities[selectedId];
});
