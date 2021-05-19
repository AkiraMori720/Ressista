import * as types from './actionsTypes';

export function setRelationShipUpdateForums(data) {
    return {
        type: types.RELATIONSHIP.UPDATE_FORUMS,
        data
    };
}

export function setCategory(data){
    return {
        type: types.RELATIONSHIP.SET_CATEGORY,
        data
    };
}
