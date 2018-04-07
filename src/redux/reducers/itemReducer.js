import * as types from '../actions/action-types';
// import _ from 'lodash';

const initialState = {
    items: [],
    item: false,
    dataReceived: false,
    map: {},
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
            return Object.assign({}, state, {
                items: action.items,
                map:{
                    action: 'placeAllItems'
                },
                dataReceived: true
            });
        }

        case types.ADD_ITEM_SUCCESS: {
            let newItems = state.items;
            newItems.push(action.item);
            return Object.assign({}, state, {
                items: newItems,
                item:action.item,
                map:{
                    action: 'confirmItem',
                    item: action.item
                },
            });
        }

        case types.EDIT_ITEM_SUCCESS: {
            let arNewItems = state.items.map((item)=>{
                if(item.id === action.item.id ){
                    return action.item;
                }
                return item;
            });
            return Object.assign({}, state, {
                items: arNewItems,
                item: action.item,
                map:{
                    action: 'editItem',
                    item: action.item
                },
            });
        }
        case types.DELETE_ITEM_SUCCESS: {
            let arNewItems = state.items.filter((item) => {
                return item.id !== action.item.id;
            });
            return Object.assign({}, state, {
                items: arNewItems,
                item: false,
                map:{
                    action: 'deleteItem',
                    item: action.item
                },
            });
        }

        case types.SET_NEW_ITEM_STATE: {
            return Object.assign({}, state, {item: false});
        }

        case types.SET_EDIT_ITEM_STATE: {
            return Object.assign({}, state, {item: action.item});
        }
        case types.SET_ON_MAP: {
            return Object.assign({}, state, {
                map:{
                    action: 'setItemCoordinates',
                    item: action.item},
            });
        }
        case types.SET_ON_MAP_FIN: {
            return Object.assign({}, state, {
                map: {},
                item: action.item
            });
        }
        case types.CLEAR_MAP_ACTIONS: {
            return Object.assign({}, state, {
                map: {}
            });
        }

        default:{
            return state;
        }
    }
};

export default itemReducer;
