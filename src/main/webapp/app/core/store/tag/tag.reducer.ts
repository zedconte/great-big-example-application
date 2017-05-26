import { createSelector } from 'reselect';

import { Tag, initialTag } from './tag.model';
import { Entities, initialEntities } from '../entity/entity.model';
import { slices } from '../util';
import * as functions from '../entity/entity.functions';
import { typeFor } from '../util';
import { actions, EntityAction } from '../entity/entity.actions';

export function reducer(state: Entities<Tag> = initialEntities<Tag>({}, slices.TAG, actions, initialTag),
    action: EntityAction<Tag>): Entities<Tag> {

    switch (action.type) {
        case typeFor(slices.TAG, actions.ADD_SUCCESS):
            return functions.addSuccess<Tag>(state, <any>action);
        case typeFor(slices.TAG, actions.ADD_TEMP):
        case typeFor(slices.TAG, actions.LOAD_SUCCESS):
            return functions.addToStore<Tag>(state, <any>action);
        case typeFor(slices.TAG, actions.UPDATE):
        case typeFor(slices.TAG, actions.UPDATE_SUCCESS):
            return functions.update<Tag>(state, <any>action);
        case typeFor(slices.TAG, actions.DELETE):
            return functions.deleteEntity<Tag>(state, <any>action);
        case typeFor(slices.TAG, actions.DELETE_TEMP):
            return functions.deleteTemp<Tag>(state, <any>action);
        case typeFor(slices.TAG, actions.SELECT):
            return functions.select<Tag>(state, <any>action);
        case typeFor(slices.TAG, actions.SELECT_NEXT):
            return functions.selectNext<Tag>(state, <any>action);
        default:
            return state;
    }
};

export const getEntities = (state: Entities<Tag>) => state.entities;

export const getIds = (state: Entities<Tag>) => state.ids;

export const getSelectedId = (state: Entities<Tag>) => state.selectedEntityId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return entities[selectedId];
});
