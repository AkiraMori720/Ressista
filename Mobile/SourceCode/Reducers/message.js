import * as types from '../Actions/actionsTypes';

const initialState = {
    unread: 0,
    rooms: []
};

export default function message(state = initialState, action) {
    switch (action.type) {
        case types.APP.INIT:
            return initialState;
        case types.MESSAGE.UNREAD_MESSAGES:
            return {
                ...state,
                unread: action.data,
            };
        case types.MESSAGE.SET_ROOMS:
            return {
                ...state,
                rooms: action.data,
            };
        default:
            return state;
    }
}
