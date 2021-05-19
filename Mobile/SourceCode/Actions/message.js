import * as types from './actionsTypes';

export function setUnreadMessages(data) {
    return {
        type: types.MESSAGE.UNREAD_MESSAGES,
        data
    };
}

export function setRooms(data){
    return {
        type: types.MESSAGE.SET_ROOMS,
        data
    };
}
