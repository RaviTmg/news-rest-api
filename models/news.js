var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var NewsSchema   = new Schema({
    title: String,
    body: String,
    categor:String,
    timestamp:Date
});

module.exports = mongoose.model('News', NewsSchema);