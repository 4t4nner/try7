import React from "react";
import {Map, Marker} from "yandex-map-react";

const mapState = {
    controls: ['default'],
    cursors: ['arrow']
};

class YMap extends React.Component {
    handleClick(e){
        let arCoord = e.get('coords');
        return false;
    }
    render() {
        return (
            <Map onAPIAvailable={function () {
                console.log('API loaded');
            }}
                 width={'100%'}
                 state={mapState}
                 center={[55.754734, 37.583314]}
                 zoom={10}
                 onClick={this.handleClick}
            >
                {/*<Marker lat={this.props.lat} lon={this.props.lon}/>*/}
            </Map>
        );
    }
}

export default YMap;

