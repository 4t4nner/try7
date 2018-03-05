// import {combineReducers} from 'redux';
// import {authStateReducer} from 'redux-oauth';
import commonReducer from './commonReducer';
import itemReducer from './itemReducer';
import timeReducer from './timeReducer';

// export default combineReducers({
//     auth: authStateReducer,
//     time: timeReducer,
//    
//     commonState: commonReducer,
//     pointState: itemReducer,
//     routeState: itemReducer
// });

export default function (state = {}, action) {
    return {
        // auth: authStateReducer(state.auth ? state.auth : null,action),
        time: timeReducer(state.time,action),
        commonState: commonReducer(state.commonState,action),
        pointState: itemReducer(state.pointState, Object.assign({}, action, {stateType: 'point'})),
        routeState: itemReducer(state.routeState, Object.assign({}, action, {stateType: 'route'}))
    };
}

// let res =  {
//     time: timeReducer(state.time,action),
//     commonState: commonReducer(state.commonState,action)
// };
// if(state.commonState && state.commonState.itemType) {
//     if (state.commonState.itemType === 'point') {
//         res.
//     }
// }
// return {
//     pointState: itemReducer(state.pointState, Object.assign({}, action, {stateType: 'point'})),
//     routeState: itemReducer(state.routeState, Object.assign({}, action, {stateType: 'route'}))
// };