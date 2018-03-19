import * as itemActions from '../../redux/actions/itemActions';
import {hashCode} from '../../utils';
let PointModel = require('../model/point').Point;
let RouteModel = require('../model/route').Route;

function getModel(url) {
    let itemType = url.split('/')[2];
    return (itemType === 'points')
        ? PointModel
        : ((itemType === 'routes')
                ? RouteModel
                : null
        );
}

// /**
//  *
//  * @param doc Object
//  */
// function getResItem(doc){
//     return {
//
//     }
// }

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
    arItem.hash = hashCode(JSON.stringify(arItem));
    let resDb = Model.findOneAndUpdate({id: arItem.id},arItem,{
        returnNew: true
    }).exec((err, item) => {
        if (err) {
            console.log('Error in first query');
            return res.status(500).send('Something went wrong getting the data');
        }

        return res.status(200).send(itemActions.editItemSuccess(item._doc,itemType));
    });
}
export function deleteItem (req, res) {

    let itemType = res.req.originalUrl.split('/')[2];
    itemType = itemType.substr(0,itemType.length-1);
    let Model = getModel(req.originalUrl);
    let arItem = req.body.arItem;
    Model.findOneAndRemove({id: arItem.id}, arItem, (err, item) => {
        if (err) {
            console.log('Error in first query');
            return res.status(500).send('Something went wrong getting the data');
        }

        return res.status(200).send(itemActions.deleteItemSuccess(arItem, itemType));
    });
}

export function addItem(req, res) {
    let Model = getModel(req.originalUrl);
    let arItem = req.body.arItem;
    arItem.hash = hashCode(JSON.stringify(arItem));
    let itemType = res.req.originalUrl.split('/')[2];
    itemType = itemType.substr(0,itemType.length-1);

    Model.findOne({})
        .select('id')
        .sort({'id': -1})
        .exec(function (err, res1) {
            if (err) {
                console.log('Error in findOneAndUpdate');
                return res.status(500).send(itemActions.addItemFailure(err));
            }

            arItem.id = res1 ? res1._doc.id + 1 : 0;
            Model.create(arItem, (err2, res2) => {
                if (err2) {
                    console.log(err2);
                    return res.status(200).send(itemActions.addItemFailure(err2));
                }

                // let arItemRes =
                return res.status(200).send(itemActions.addItemSuccess(res2._doc, itemType));
            });
        })
    ;
}

