import * as types from '../Actions/actionsTypes';

const initialState = {
    updateForums: 0,
    relationship: []
};

export default function relationship(state = initialState, action) {
    switch (action.type) {
        case types.APP.INIT:
            return initialState;
        case types.RELATIONSHIP.UPDATE_FORUMS:
            return {
                ...state,
                updateForums: action.data,
            };
        case types.RELATIONSHIP.SET_CATEGORY:
            return {
                ...state,
                relationship: action.data,
            };
        default:
            return state;
    }
}
