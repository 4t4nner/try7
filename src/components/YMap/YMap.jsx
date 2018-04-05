import React, {Component, PropTypes} from 'react';
import {YMaps,Map,GeoObject, Placemark} from 'react-yandex-maps';
import {connect} from 'react-redux';


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

        console.log('YMap : constructor', arguments);
        // this.handleClickSave = this.handleClickSave.bind(this);
    }
    componentDidMount() {
        console.log('YMap : componentDidMount', arguments);
        // this.props.fetchData('/db/points');
    }

    componentWillReceiveProps(newProps) {

        console.log('YMap : componentWillReceiveProps',[this.props, newProps]);
        // if(this.props)
        let newState = mapState;
        if(newProps.itemType !== this.props.itemType){
            return;
        }
        if(newProps.action){
            if(newProps.action.setItemCoordinates){
                if(newProps.action.setItemCoordinates.coord && newProps.action.setItemCoordinates.coord[0]){
                    newState.center = newProps.action.setItemCoordinates.coord;
                }

            }
        }

    }
    handleApiAvaliable(ymaps) {
        console.log(this.map);
    }

    handleClick(e){
        let arCoord = e.get('coords');
        // e.originalEvent.target.cursors.push('arrow');
        return false;
    }
    someEvent(e){
        console.log(e);
    }
    getMapPoints(arPoints){
        let arPlacemarks = null;

        return arPoints.reduce((all,point)=>{
            if(point.coord && point.coord[0]){
                return all.push({
                    "geometry": {
                        "coordinates": point.coord
                    },
                    "properties": {
                        "balloonContent": point.title,
                        "iconCaption": point.code
                    },
                    "options": {
                        "preset": "islands#greenDotIconWithCaption"
                    }
                });
            }

            else return all;
        },[]);
    }
    render() {
        console.log('YMap : render',[this.props, this.state]);
        return (
            <YMaps
                onApiAvaliable={(ymaps) => this.handleApiAvaliable(ymaps)}
            >
                <Map
                    state={mapState}
                    cursor={'ARROW'}
                    width={'100%'}
                    onAPIAvailable={function (arg) {
                        console.log('API loaded');
                    }}
                    onClick={this.handleClick}
                    onLoad={this.someEvent}
                    onAdd={this.someEvent}
                    onFullscreenEnter={this.someEvent}
                    onLocationChange={this.someEvent}
                    onEnable={this.someEvent}
                    onActionTick={this.someEvent}
                    onActionBegin={this.someEvent}
                    // instanceRef={this.setMapControlInstanceRef}
                    ref={(map) => {this.map = map;}}
                >
                    {this.getMapPoints(this.props.points.items).map((placemarkParams, i) =>
                        <Placemark key={i} {...placemarkParams} />
                    )}

                </Map>
            </YMaps>
        );
    }

    // setMapControlInstanceRef = ref => {
    //     console.log('setMapControlInstanceRef');
    //     this.map = ref;
    // }
    //
    // setMapControlInstanceRef1 = ref => {
    //     console.log('setMapControlInstanceRef1!!!!!!!!');
    //     this.map = ref;
    // }
}

YMap.propTypes = propTypes;

function mapStateToProps(state) {

    return {
        itemType : state.commonState.itemType,
        points: state.pointState,
        routes: state.commonState.itemType === 'point'
            ? state.routeState
            : [],//
        map:state.mapState
    };
}


function mergeProps(stateProps, dispatchProps) {

    const { dispatch } = dispatchProps;

    return Object.assign({}, stateProps, {
        dispatch: dispatch
    });
}

export default connect(mapStateToProps, null,mergeProps)(YMap);
