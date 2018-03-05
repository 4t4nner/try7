import * as itemActions from "../../redux/actions/itemActions";
// import * as routeActions from '../../redux/actions/routeActions';
// let libs = '../';
// let log = require( libs +'log')(module);

let PointModel = require('../model/items').Point;
let RouteModel = require('../model/items').Route;

let deb = {
    deb1:1
};


function getModel(url) {
    let itemType = url.split('/')[2];
    return (itemType === 'points')
        ? PointModel
        : ((itemType === 'routes')
                ? RouteModel
                : null
        );
}

export function findAll(req, res) {

    let Model = getModel(req.originalUrl);

    let resDb = Model.find({}).exec((err, items) => {
        if (err) {
            console.log('Error in first query');
            return res.status(500).send('Something went wrong getting the data');
        }

       let itemsSend = items.map((item) => {
            let jItem = item.toJSON();
            return {
                title:  jItem.title,
                code:   jItem.code,
                active: jItem.active,
                id :    jItem.id
            };
        });
        let itemType = res.req.originalUrl.split('/')[2];
        itemType = itemType.substr(0,itemType.length-1);
        return res.status(200).send( itemActions.getItemsSuccess(itemsSend,itemType));
    }
    );
}

export function editItem (req, res) {

    let itemType = res.req.originalUrl.split('/')[2];
    itemType = itemType.substr(0,itemType.length-1);
    let Model = getModel(req.originalUrl);
    let arItem = req.body.arItem;
    let resDb = Model.findOneAndUpdate({id: arItem.id},arItem,{
        returnNew: true
    }).exec((err, item) => {
        if (err) {
            console.log('Error in first query');
            return res.status(500).send('Something went wrong getting the data');
        }

        // let jItem = item.toJSON();


        return res.status(200).send(itemActions.editItemSuccess(arItem,itemType));
    });
}

export function addItem(req, res) {
    let Model = getModel(req.originalUrl);
    let arItem = req.body.arItem;
    let itemType = res.req.originalUrl.split('/')[2];
    itemType = itemType.substr(0,itemType.length-1);
    let resDb = Model.create(req.body.arItem, (err) => {
        if (err) {
            console.log(err);
            return res.status(200).send(itemActions.addItemFailure(err));
        }

        return res.status(200).send(itemActions.addItemSuccess(arItem,itemType));
    });
}


