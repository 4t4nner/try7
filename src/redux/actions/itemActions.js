import * as types from '../actions/action-types';
import {addOne, getAll,updateOne,deleteOne} from '../../services';

export function addItem(item) {
    return  function (dispatch, getState) {

        const state = getState();
        const itemType = state.commonState.itemType;

        const itemState = (itemType === 'item')
            ? state.pointState
            : state.routeState ;

        if (itemState.items.filter(itemItem => itemItem.code === item.code).length > 0) {
            return dispatch(addItemDuplicate());
        }

        let promise = new Promise((resolve,reject) => {
            addOne(item, itemType, resolve);
        });

        return dispatch(promise
            .then(
                result => {
                    return dispatch(result);
                },
                error => {
                    return error;
                }
            ));
    };
}

export function editItem(item) {
    return  function (dispatch, getState) {

        let promise = new Promise((resolve,reject) => {
            updateOne(item, getState().commonState.itemType, resolve);
        });

        return dispatch(promise
            .then(
                result => {
                    return dispatch(result);
                },
                error => {
                    return error;
                }
            ));
    };
}

export function deleteItem(item) {
    return  function (dispatch, getState) {

        let promise = new Promise((resolve,reject) => {
            deleteOne(item, getState().commonState.itemType, resolve);
        });

        return dispatch(promise
            .then(
                result => {
                    return dispatch(result);
                },
                error => {
                    return error;
                }
            ));
    };
}



export function findAll() {
    return  function (dispatch, getState) {

        let promise = new Promise((resolve,reject) => {
            getAll({}, getState().commonState.itemType, resolve);
        });

        return dispatch(promise
            .then(
                result => {
                    return dispatch(result);
                },
                error => {
                    return error;
                }
            ));
    };
}

export function getItemsSuccess(items, itemType) {
    return {
        type: types.GET_ITEMS_SUCCESS,
        items,
        itemType : itemType
    };
}

export function addItemSuccess(item, itemType) {
    return {
        type: types.ADD_ITEM_SUCCESS,
        item: item,
        itemType : itemType
    };
}

export function addItemDuplicate() {
    return {
        type: types.ADD_ITEM_DUPLICATE
    };
}

export function addItemFailure(err) {
    return {
        type: types.ADD_ITEM_FAILURE,
        err: err.toJSON()
    };
}

export function editItemSuccess(item, itemType) {
    return {
        type: types.EDIT_ITEM_SUCCESS,
        item,
        itemType: itemType
    };
}
export function deleteItemSuccess(item, itemType) {
    return {
        type: types.DELETE_ITEM_SUCCESS,
        item,
        itemType: itemType
    };
}

export function setItemType(itemType) {
    return {
        type: types.SET_ITEM_TYPE,
        itemType : itemType,
        itemStateName: itemType + 'State'
    };
}
export function clearMapActions(itemType) {
    return {
        type: types.CLEAR_MAP_ACTIONS,
        itemType : itemType,
        itemStateName: itemType + 'State'
    };
}

export function setItemOnMap(item) {
    return {
        type: types.SET_ON_MAP,
        item: item,
        itemType: item.itemType,
        // itemType : itemType,
        // itemStateName: itemType + 'State'
    };
}

export function setItemOnMapFinish(item) {
    return {
        type: types.SET_ON_MAP_FIN,
        item: item,
        itemType: item.itemType,
        // itemType : itemType,
        // itemStateName: itemType + 'State'
    };
}


export function itemListClick(code) {
    return  function (dispatch, getState) {
        let action = {};
        const state = getState();
        const itemType = state.commonState.itemType;
        if (code) {
            const itemState = (itemType === 'point')
                ? state.pointState
                : state.routeState ;

            const item = itemState.items.filter(item => item.code === code)[0];
            action = {
                type: types.SET_EDIT_ITEM_STATE,
                item: item,
                itemType : itemType
            };
        } else {
            action = {
                type: types.SET_NEW_ITEM_STATE,
                itemType : itemType
            };
        }

        return dispatch(action);

    };
}


export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsFetchData(url,callback) {
    return (dispatch) => {
        // dispatch(itemsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                // dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((response) => {
                let debug = 1;
                dispatch(response);
                callback(response);
            })
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

