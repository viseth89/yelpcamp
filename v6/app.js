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
mongoose.connect('mongodb://localhost/yelp_camps_v6', { useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
console.log(__dirname)

//PASSPORT CONFIGURATION

app.use(require('express-session')({
  secret:'Tyson is the best',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Understand better 12/12
app.use(function(req,res, next){
  res.locals.currentUser = req.user;
  next();
})

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
            res.render('campgrounds/index', {campgrounds: allCampgrounds, currentUser: req.user});
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

app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req,res){
  //find campground by id

  Campground.findById(req.params.id, function(err,campground){
    if(err){
      console.log(err);
    } else {
      res.render('comments/new', {campground: campground})
    }
  })
});

app.post("/campgrounds/:id/comments",isLoggedIn, function(req, res){
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

//========
//AUTH ROUTES
//========

//SHOW REGISTER form
app.get('/register', function(req, res){
  res.render('register');
});
//handle sign up logic
app.post('/register', function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function(){
      res.redirect('/campgrounds');
    });
  });
});

//show login form
app.get('/login', function(req, res){
  res.render('login');
});

//handling login logic
app.post('/login', passport.authenticate('local',
  {
    successRedirect: '/campgrounds',
    failureRedirect: 'login'
  }), function(req, res){
});

//logout ROUTES
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/campgrounds')
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}
app.listen(3000, function () {
    console.log('YelpCamp is serving on port 3000')
});
