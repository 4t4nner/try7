import React, {Component, PropTypes} from 'react';
// import {YMaps,Map,GeoObject, Placemark} from 'react-yandex-maps';
import {connect} from 'react-redux';
import * as YMUtils from '../../utils/ymaps';

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
        YMUtils.init(this.props,
            function (map) {
                this.setState({map: map,update: false});
            }.bind(this),
            []
        );
    }

    componentWillReceiveProps(newProps) {

        console.log('YMap : componentWillReceiveProps',[this.props, newProps]);
        // if(this.props)
        let newState = mapState;
        if(newProps.itemType !== this.props.itemType){
            return;
        }
        if(newProps.action){

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
