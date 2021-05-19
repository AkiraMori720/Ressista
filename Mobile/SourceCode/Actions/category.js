import * as types from './actionsTypes';

export function setUpdateForums(data) {
    return {
        type: types.CATEGORY.UPDATE_FORUMS,
        data
    };
}

export function setCategories(data){
    return {
        type: types.CATEGORY.SET_CATEGORIES,
        data
    };
}
