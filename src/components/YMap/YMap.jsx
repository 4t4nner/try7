import React, {Component, PropTypes} from 'react';
import {YMaps,Map} from 'react-yandex-maps';
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
        if(newProps.itemType !== this.props.itemType){
            // let itemType = window.location.pathname;
            // itemType = itemType.substr(1,itemType.length-2);
            // this.props.dispatch(setItemType(itemType));
        }
    }

    handleClick(e){
        let arCoord = e.get('coords');
        // e.originalEvent.target.cursors.push('arrow');
        return false;
    }
    render() {
        console.log('YMap : render',[this.props, this.state]);
        return (
            <YMaps>
                <Map
                    state={mapState}
                    width={'100%'}
                    onAPIAvailable={function () {
                        console.log('API loaded');
                    }}
                    onClick={this.handleClick}
                >

                </Map>
            </YMaps>
        );
    }
}

YMap.propTypes = propTypes;

function mapStateToProps(state) {

    return {
        itemType : state.commonState.itemType,
        pointState: state.pointState,
        routeState: state.commonState.itemType === 'point'
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
