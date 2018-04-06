const defaultParams = {
    map:{
        center: [55.76, 37.64],
        zoom: 7
    }
};


function prepareMapParams(map){
    return map && map.center ? map : defaultParams.map;
}

/**
 *
 * @param props
 * @param setMap - callback
 * @param events = [['event',callback],..] //
 */
export function init(props, setMap,events) {

    if(typeof (global.ymaps) !== 'undefined'){
        ymaps.ready(() =>{

            let map = new global.ymaps.Map("map", prepareMapParams(props.map));

            addPoints(map, props.points.items);
            addRoutes(map, props.routes.items);

            if(setMap){
                setMap(map);
            }
        });


    }
}


export function addRoutes(map, points) {

}


export function addPoints(map, points) {

    points.map((point) => {
        if(!point.coord || !point.title || !point.active){
            throw new Error('no point coordinates');
        }

        return new global.ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: point.coord
            },
            // Свойства.
            properties: {
                // Контент метки.
                uniqueId: 'point'.point.id,
                iconContent: point.code,
                hintContent: point.title
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#blackStretchyIcon',
            // Метку можно перемещать.
            draggable: false
        });
    });
}

/**
 *
 * @param map
 * @param point
 * @param getCoord - callback returns coord
 */
export function placePoint(map, point, getCoord) {

    if(!point.id){
        point.id = 'new';
    } else {
        global.ymaps.geoQuery(map.geoObjects).search('properties.uniqueId = '+'point'+point.id).removeFromMap(map);
        map.setCenter(point.coord);
    }

    window.scrollTo(0,0);

    map.cursor.push('arrow');

    let placePointOnClick = () => {
        point.coord = getCoord(e.get('coords'));

        addPoints([point]);

        map.events.remove('click',placePointOnClick,this);

        return point;
    };

    map.events.add('click',placePointOnClick,this);
}

