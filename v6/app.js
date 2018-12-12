var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose'),
    passport      = require('passport'),
    LocalStrategy = require('passport-local'),
    Campground    = require('./models/campground'),
    Comment       = require('./models/comment'),
    User          = require('./models/user'),
    seedDB        = require('./seeds')

//seedDB();
mongoose.connect('mongodb://localhost/yelp_camps_v6');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
console.log(__dirname)


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
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
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
    res.render('campgrounds/new')
});

//show - shows more info
app.get('/campgrounds/:id', function(req, res){
    //find campground with provided id
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
          console.log(foundCampground)
            //
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
    req.params.id
});

//===========
// COMMENTS ROUTES
//============

app.get("/campgrounds/:id/comments/new", function(req,res){
  //find campground by id

  Campground.findById(req.params.id, function(err,campground){
    if(err){
      console.log(err);
    } else {
      res.render('comments/new', {campground: campground})
    }
  })
});

app.post("/campgrounds/:id/comments", function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});

app.listen(3000, function () {
    console.log('YelpCamp is serving on port 3000')
});
