import React from "react";
import {YMaps,Map} from "react-yandex-maps";


const mapState = {
    // controls: ['default'],
    cursors: ['arrow'],
    center: [55.754734, 37.583314],
    zoom: 10
    // width: '100%'
};

class YMap extends React.Component {
    handleClick(e){
        let arCoord = e.get('coords');
        // e.originalEvent.target.cursors.push('arrow');
        return false;
    }
    render() {
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

export default YMap;
