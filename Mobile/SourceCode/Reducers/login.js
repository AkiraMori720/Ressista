import * as types from '../Actions/actionsTypes';

const initialState = {
    isAuthenticated: false,
    isFetching: false,
    user: {},
    error: {},
};

export default function login(state = initialState, action) {
    switch (action.type) {
        case types.APP.INIT:
            return initialState;
        case types.LOGIN.REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
                failure: false,
                error: {}
            };
        case types.LOGIN.SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                user: action.data,
                failure: false,
                error: {}
            };
        case types.LOGIN.FAILURE:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                failure: true,
                error: action.err
            };
        case types.LOGOUT:
            return initialState;
        case types.USER.SET:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.user
                }
            };
        default:
            return state;
    }
}
