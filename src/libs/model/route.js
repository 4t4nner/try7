
let mongoose = require('../db/mongoose'),
  Schema = mongoose.Schema;

const ItemSchema = new Schema({
    id         : {
        type: Number,
        default : 0
    },
    title     : {
        type    : String,
        unique  : true
    },
    code     : {
        type    : String,
        unique  : true
    },
    points     : {
        type    : Array,
        default  : []
    },
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

exports.Route = mongoose.model('Route', ItemSchema);

