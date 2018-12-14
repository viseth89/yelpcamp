var express=require('express');
var router=express.Router();
var Campground = require('../models/campground')

//INDEX-SHOW all campgrounds
router.get('/', function (req, res) {
    //get all campgrounds from db
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

//Create - add new campground to db
router.post('/', function (req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect('/campgrounds')
        }
    });
});

//new - show form to create new campground
router.get('/new', function (req, res) {
    res.render('campgrounds/new')
});

//show - shows more info
router.get('/:id', function(req, res){
    //find campground with provided id
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
          console.log(foundCampground)
            // render show template with that campground
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

module.exports = router
