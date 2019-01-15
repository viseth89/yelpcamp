var express             = require('express'),
    app                 = express(),
    bodyParser          = require('body-parser'),
    mongoose            = require('mongoose');
    Campground          = require('./models/campground')
    seedDB              = require('./seeds')

seedDB();

mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

// Campground.create(
//     {   
//         name: 'volkswagen', 
//         image: 'https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f7c570a0eeb3bd_340.jpg',
//         description:'THis is a huge hill'
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log('newly created campground');
//             console.log(campground)
//         }
//     });

app.get('/', function(req, res){
    res.render('landing')
});

// Index - Show all Campgrounds
app.get('/campgrounds', function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render('index', {campgrounds:allCampgrounds});
        }
    })
});

// Create Route - Add New campground to DB -----> 2 of 2
app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var newCampground = {name:name, image: image, description:description}
    // create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect('/campgrounds');
        }
    });
});

// New Route - Show form to create new campground ---- > 1 of 2
app.get("/campgrounds/new", function (req,res){
    res.render('new')
})

// PAY ATTENTION TO PLACEMENT OF ROUTES notice here how 'campgrounds/new' is above campgrounds/id, this is done otherwise campgrounds/new
// will register as campgrounds id because of the placement!!!! CRUCIAL INFORMATION!!!!
// SHOW - shows more info about one campgroud
app.get('/campgrounds/:id', function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render('show', {campground: foundCampground});
        }
    });
})

app.listen(3000);
console.log('YelpCamp has started on port 3000')

// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("the yelpcamp server has started ");
// });