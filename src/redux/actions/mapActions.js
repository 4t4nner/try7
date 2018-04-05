import * as types from '../actions/action-types';

export function setItemOnMap(item) {
    return  function (dispatch, getState) {
        let action = {};
        const state = getState();
        const itemType = state.commonState.itemType;
        if(item && typeof(item.id) === 'number') {
            action = {
                type: types.SET_MAP_POINT,
                item: item,
                itemType: itemType
            };

            return dispatch(action);
        }
    };
}