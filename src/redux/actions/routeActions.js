import * as types from '../actions/commonTypes';

export function setItemType(itemType) {
    return {
        type: types.SET_ITEM_TYPE,
        itemType
    };
}

