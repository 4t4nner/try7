// запросы к restApi

import axios from "axios";

let baseUri = 'http://localhost:3001/db/';
let uri = baseUri;

function setState(_itemType,action = '') {
    uri = baseUri + _itemType + 's/' + action;
}

export function getAll(data, itemType = 'point', callback){
    setState(itemType);
    return execQuery(data, axios.get, callback);
}

export function addOne(data, itemType = 'point', callback){
    setState(itemType,'add');

    // return callback(execQuery(data, storeActions.addItemSuccess, axios.post));
    return execQuery(data,  axios.post, callback);
}

export function updateOne(data, itemType = 'point', callback){
    setState(itemType,'edit');
    return execQuery(data,  axios.post, callback);

}


function execQuery(
    data,
    sendFunc = axios.get,
    callback
){
    // let strData = JSON.stringify(data);
    return sendFunc(uri,
        {
            arItem : data
        }, // data
        {
            headers: {
                'Content-Type':  'application/json',
                'Accept':        'application/json'
            }
        }

    )
        .then(response => {
            if(callback){
                callback(response.data);
            }
            return response.data;
        });
}

