import * as itemControllers from '../controllers/items';

export default (app) => {


//    ITEMS

    app.post(['/db/points/delete','/db/routes/delete'], itemControllers.deleteItem);
    app.post(['/db/points/edit','/db/routes/edit'], itemControllers.editItem);
    app.post(['/db/points/add','/db/routes/add'], itemControllers.addItem);
    app.get(['/db/points/','/db/routes/'], itemControllers.findAll);

};
