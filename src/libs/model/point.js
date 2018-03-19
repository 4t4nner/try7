
let mongoose = require('../db/mongoose'),
  Schema = mongoose.Schema;

const ItemSchema = new Schema({
    id         : {
        type: Number,
        default : 0,
        unique  : true
    },
    title     : {
        type    : String,
        unique  : false
    },
    hash     : {
        type    : String,
        unique  : true
    },
    code     : {
        type    : String,
        unique  : true
    },
    coord     : mongoose.Schema.Types.Mixed,
    active: {
        type: Boolean,
        default: true
    },
    // data: {
    //     type: mongoose.Schema.Types.Mixed,
    //     default: {}
    // },
    created: {
        type: Date,
        default: Date.now
    }
});


exports.Point = mongoose.model('Point', ItemSchema);

