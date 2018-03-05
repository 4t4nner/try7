
let mongoose = require('../db/mongoose'),
  Schema = mongoose.Schema;

const ItemSchema = new Schema({
    // id : Number,
    // name : String
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
    active: {
        type: Boolean,
        default: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    created: {
        type: Date,
        default: Date.now
    }
});

exports.Point = mongoose.model('Point', ItemSchema);
exports.Route = mongoose.model('Route', ItemSchema);

