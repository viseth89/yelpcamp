var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground = require('./models/campground')
    seedDB = require('./seeds')

seedDB();
mongoose.connect('mongodb://localhost/yelp_camps_v3');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

/*
Campground.create(
    {
        name:'Granite Hill',
        image:'https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg',
        description:'This is a huge granite hill, no bathrooms, no water'
    },
    function(err, campground){
        if(err){
            console.log(err)
        } else {
            console.log('newly created ground');
            console.log(campground);
        }
    }
);

*/






app.get('/', function (req, res) {
    res.render('landing');
});

//INDEX-SHOW all campgrounds
app.get('/campgrounds', function (req, res) {
    //get all campgrounds from db
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {campgrounds: allCampgrounds});
        }
        //res.render('campgrounds', {campgrounds:campgrounds})
    });
});

//Create - add new campground to db
app.post('/campgrounds', function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};


    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect('/campgrounds')
        }
    });
});

//new - show form to create new campground
app.get('/campgrounds/new', function (req, res) {
    res.render('new.ejs')
});

//show - shows more info
app.get('/campgrounds/:id', function(req, res){
    //find campground with provided id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //
            res.render('show', {campground: foundCampground});
        }
    });
    req.params.id
});

app.listen(3000, function () {
    console.log('YelpCamp is serving on port 3000')
});
