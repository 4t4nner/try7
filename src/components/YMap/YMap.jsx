import React, {Component, PropTypes} from 'react';
// import {YMaps,Map,GeoObject, Placemark} from 'react-yandex-maps';
import {connect} from 'react-redux';
import * as YMUtils from '../../utils/ymaps';

import {setItemOnMapFinish,clearMapActions} from 'redux/actions/itemActions';

const mapState = {
    // controls: ['default'],
    cursors: ['arrow'],
    center: [55.754734, 37.583314],
    zoom: 10
    // width: '100%'
};

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    itemType: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired
};

class YMap extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        console.log('YMap : constructor', arguments);
        // this.handleClickSave = this.handleClickSave.bind(this);
    }

    componentDidMount() {
        console.log('YMap : componentDidMount', arguments);
    }

    componentWillReceiveProps(newProps) {

        console.log('YMap : componentWillReceiveProps',[this.props, newProps]);
        // if(this.props)
        let newState = mapState;
        if(newProps.itemType !== this.props.itemType){
            return;
        }
        if (newProps.points.map.action) {
            switch (newProps.points.map.action){
                case 'setItemCoordinates': {
                    YMUtils.placePointOnClick(this.state.map, newProps.points.map.item, function (coord) {
                        this.props.dispatch(setItemOnMapFinish(
                            Object.assign({},
                                newProps.points.map.item,
                                {coord: coord})
                        ));

                    }.bind(this));
                    break;
                }
                case 'confirmItem': {
                    YMUtils.confirmPoint(this.state.map,newProps.points.map.item);
                    this.props.dispatch(clearMapActions(this.props.itemType));
                    break;
                }
                case 'editItem': {
                    YMUtils.editPoint(this.state.map,newProps.points.map.item);
                    this.props.dispatch(clearMapActions(this.props.itemType));
                    break;
                }
                case 'deleteItem': {
                    YMUtils.deletePoint(this.state.map,newProps.points.map.item);
                    this.props.dispatch(clearMapActions(this.props.itemType));
                    break;
                }
                case 'placeAllItems': {
                    // YMUtils.addPoints(this.state.map,newProps.points.items);

                    YMUtils.init(newProps,
                        function (map) {
                            this.setState({map: map,update: false});
                            this.props.dispatch(clearMapActions(this.props.itemType));
                        }.bind(this),
                        []
                    );
                    break;
                }
                default:{
                    console.log('not handled action');
                }
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        // if(typeof (nextState.update) !== 'undefined'){
        //     return nextState.update;
        // }
        return false;
    }

    componentDidUpdate(arg){
        console.log('YMap : componentDidUpdate', arguments);

    }
    // handleApiAvaliable(ymaps) {
    //     console.log(this.map);
    // }
    //
    // static handleClick(e){
    //     let arCoord = e.get('coords');
    //     // e.originalEvent.target.cursors.push('arrow');
    //     return false;
    // }
    // static someEvent(e){
    //     console.log(e);
    // }
    // static getMapPoints(arPoints){
    //     let arPlacemarks = null;
    //
    //     return arPoints.reduce((all,point)=>{
    //         if(point.coord && point.coord[0]){
    //             return all.push({
    //                 "geometry": {
    //                     "coordinates": point.coord
    //                 },
    //                 "properties": {
    //                     "balloonContent": point.title,
    //                     "iconCaption": point.code
    //                 },
    //                 "options": {
    //                     "preset": "islands#greenDotIconWithCaption"
    //                 }
    //             });
    //         }
    //
    //         else return all;
    //     },[]);
    // }
    render() {
        console.log('YMap : render',[this.props, this.state]);
        return (
            <div id="map"
                 style={{
                     width: '100%',
                     height: '85vh',
                 }}
            > </div>
        );
    }
}

YMap.propTypes = propTypes;

function mapStateToProps(state) {

    return {
        itemType : state.commonState.itemType,
        points: state.pointState,
        routes: state.commonState.itemType === 'point'
            ? state.routeState
            : [],//
    };
}


function mergeProps(stateProps, dispatchProps) {

    const { dispatch } = dispatchProps;

    return Object.assign({}, stateProps, {
        dispatch: dispatch
    });
}

export default connect(mapStateToProps, null,mergeProps)(YMap);
