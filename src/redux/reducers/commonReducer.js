import * as types from '../actions/action-types';


const initialState = {
    itemType: 'point'
};

const commonReducer = function (state = initialState, action) {

    switch (action.type) {

        case types.SET_ITEM_TYPE: {
            return Object.assign({}, state, {itemType: action.itemType, itemStateName: action.itemStateName});
        }

        default:{
            return state;
        }
    }
};

export default commonReducer;
