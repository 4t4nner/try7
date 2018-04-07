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
        if(!point.coord || !point.title){
            throw new Error('no point coordinates');
        }
        if(!point.active){
            console.log('point not active');
            return [];
        }

        map.geoObjects.add(new ymaps.Placemark(point.coord, {
            uniqueId: 'point' + ( point.id !== false ? point.id : 'new'),
            balloonContent: point.title,
            iconCaption: point.code
        }, {
            preset: 'islands#icon',
            iconColor: '#3b5998'
        }));
    });
}

/**
 *
 * @param map
 * @param point
 * @param returnCoord - callback returns coord
 */
export function placePointOnClick(map, point, returnCoord = false) {

    if(typeof(point.id) !== 'number'){
        point.id = false;
    } else {
        global.ymaps.geoQuery(map.geoObjects).search('properties.uniqueId == "point'+point.id+'"').removeFromMap(map);
        map.setCenter(point.coord);
    }

    let oldOffset = window.pageYOffset;
    window.scrollTo(0,0);

    map.cursors.push('arrow');

    let placePointOnClick = (e) => {
        point.coord = e.get('coords');

        addPoints(map,[point]);

        map.events.remove('click',placePointOnClick,this);

        returnCoord(point.coord);


        map.cursors.push('grab');
        window.scrollTo(0,oldOffset);
        return point;
    };

    map.events.add('click',placePointOnClick,this);
}

export function editPoint(map, point, callback = false) {
    global.ymaps.geoQuery(map.geoObjects).search('properties.uniqueId == "point'+point.id+'"').removeFromMap(map);
    addPoints(map,[point]);
}
export function confirmPoint(map, point, callback = false) {
    global.ymaps.geoQuery(map.geoObjects).search('properties.uniqueId == "pointnew"').removeFromMap(map);
    addPoints(map,[point]);
}
export function deletePoint(map, point, callback = false) {
    global.ymaps.geoQuery(map.geoObjects).search('properties.uniqueId == "point'+point.id+'"').removeFromMap(map);
}