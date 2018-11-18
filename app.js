var express = require('express')
// var request = require('request')
var app = express();
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res){
  res.render('landing');
});

var campgrounds = [
  {name:'Solo Site', image: 'https://survivallife.com/wp-content/uploads/2017/06/campgrounds-feature.jpg'},
  {name:'Yaha Clan', image: 'https://survivallife.com/wp-content/uploads/2017/06/campgrounds-feature.jpg'},
  {name:'Indian Trail', image: 'https://survivallife.com/wp-content/uploads/2017/06/campgrounds-feature.jpg'},
  {name:'Indian Trail', image: 'https://survivallife.com/wp-content/uploads/2017/06/campgrounds-feature.jpg'},
  {name:'Indian Trail', image: 'https://survivallife.com/wp-content/uploads/2017/06/campgrounds-feature.jpg'},
  {name:'Indian Trail', image: 'https://survivallife.com/wp-content/uploads/2017/06/campgrounds-feature.jpg'}

]

app.get('/campgrounds', function(req, res){

  res.render('campgrounds', {campgrounds:campgrounds})
});

app.post('/campgrounds', function(req, res){
  var name=req.body.name;
  var image = req.body.image
  var newCampground = {name: name, image: image}
  campgrounds.push(newCampground)
  //get data from form and add to campgrounds array
  res.redirect('/campgrounds')
  //redirect back to campgrounds page

})

app.get('/campgrounds/new', function(req, res){
  res.render('new.ejs')
})


app.listen(3000,function(){
  console.log('YelpCamp is serving on port 3000');
});
