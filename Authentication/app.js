var express                 = require('express'),
    mongoose                = require('mongoose'),
    passport                = require('passport'),
    bodyParser              = require('body-parser'),
    User                    = require('./models/user'),
    LocalStrategy           = require('passport-local'),
    passpoartLocalMongoose  = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/auth_demo_app', { useNewUrlParser: true });
var app = express();
app.set('view engine', 'ejs');

app.use(require('express-session')({
    secret: 'Tyson is the best',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req,res){
    res.render('home');
});

app.get('/secret', function(req, res){
    res.render('secret');
});

app.listen(3000,function(){
  console.log('Authentication is serving on port 3000');
});