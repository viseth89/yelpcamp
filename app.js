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
  {name:'Solo Site', image: 'https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144597f4c97aafedbd_340.jpg'},
  {name:'Yaha Clan', image: 'https://pixabay.com/get/ea32b6062afc013ed1584d05fb1d4e97e07ee3d21cac104491f2c571a4e5b5b0_340.jpg'},
  {name:'Indian Trail', image: 'https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg'},
  {name:'Indian Trail', image: 'https://farm7.staticflickr.com/6193/6108828094_efc27cbbed.jpg'},
  {name:'Indian Trail', image: 'https://survivallife.com/wp-content/uploads/2017/06/campgrounds-feature.jpg'},
  {name:'Solo Site', image: 'https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144597f4c97aafedbd_340.jpg'},
  {name:'Yaha Clan', image: 'https://pixabay.com/get/ea32b6062afc013ed1584d05fb1d4e97e07ee3d21cac104491f2c571a4e5b5b0_340.jpg'},
  {name:'Indian Trail', image: 'https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg'},
  {name:'Indian Trail', image: 'https://farm7.staticflickr.com/6193/6108828094_efc27cbbed.jpg'},
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
