import * as types from '../actions/action-types';

const initialState = {
    centerItemId: null,
    action: null,
};
const defaultAction = {
    centerItemId: null,
    action: null,
};

export default function (state = initialState, action = defaultAction) {
    switch (action.type) {
        case types.SET_MAP_POINT: {
            return Object.assign({}, state, {
                action: {
                    setItemCoordinates: action.item
                },
            });
        }
        case types.SET_MAP_STATE: {
            return state;
        }
        default:
            return state;
    }
}
