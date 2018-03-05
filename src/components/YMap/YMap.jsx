import React from "react";
import {Map, Marker} from "yandex-map-react";

const mapState = {
    controls: ['default']
};

class YMap extends React.Component {
    render() {
        return (
            <Map onAPIAvailable={function () {
                console.log('API loaded');
            }}
                 width={'100%'}
                 state={mapState}
                 center={[55.754734, 37.583314]}
                 zoom={10}
            >
                {/*<Marker lat={this.props.lat} lon={this.props.lon}/>*/}
            </Map>
        );
    }
}

export default YMap;

