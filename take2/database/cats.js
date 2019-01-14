var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app')

var catSchema = new mongoose.Schema({
    name:String,
    age:Number,
    temper:String
});

var Cat = mongoose.model('Cat', catSchema)