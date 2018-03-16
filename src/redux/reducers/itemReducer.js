import * as types from '../actions/action-types';
// import _ from 'lodash';

const initialState = {
    items: [],
    item: false,
    itemType : ''
};

const itemReducer = function (state = initialState, action) {

    if(state.itemType){
        if(state.itemType !== action.itemType){
            return state;
        }
    }

    switch (action.type) {

        case '@@INIT' : {
            return Object.assign({}, state, {itemType: action.stateType});
        }

        case types.GET_ITEMS_SUCCESS: {
            return Object.assign({}, state, {items: action.items});
        }

        case types.ADD_ITEM_SUCCESS: {
            let newItems = state.items;
            newItems.push(action.item);
            return Object.assign({}, state, {
                items: newItems,
                item:action.item
            });
        }

        case types.EDIT_ITEM_SUCCESS: {
            let arNewItems = state.items.map((item)=>{
                if(item.id === action.item.id ){
                    return action.item;
                }
                return item;
            });
            return Object.assign({}, state, {items: arNewItems,item:action.item});
        }
        case types.DELETE_ITEM_SUCCESS: {
            let arNewItems = state.items.filter((item) => {
                return item.id !== action.item.id;
            });
            return Object.assign({}, state, {items: arNewItems,item:false});
        }

        case types.SET_NEW_ITEM_STATE: {
            return Object.assign({}, state, {item: false});
        }
        // TODO PLACE_NEW_MAP_MARK

        case types.SET_EDIT_ITEM_STATE: {
            return Object.assign({}, state, {item: action.item});
        }

        default:{
            return state;
        }
    }
};

export default itemReducer;
