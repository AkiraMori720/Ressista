import * as types from '../Actions/actionsTypes';

const initialState = {
    updateForums: 0,
    categories: []
};

export default function category(state = initialState, action) {
    switch (action.type) {
        case types.APP.INIT:
            return initialState;
        case types.CATEGORY.UPDATE_FORUMS:
            return {
                ...state,
                updateForums: action.data,
            };
        case types.CATEGORY.SET_CATEGORIES:
            return {
                ...state,
                categories: action.data,
            };
        default:
            return state;
    }
}
