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
  {name:'Solo Site', image: 'https://pixabay.com/get/e830b90b2ef71c22d2524518b7444795ea76e5d004b0144597f6c471a4eabc_340.png'},
  {name:'Yaha Clan', image: 'https://pixabay.com/get/ea37b80c2ce90021d85a5854ee4d459fe270e7c818b4154393f5c97aa0e4_340.png'},
  {name:'Indian Trail', image: 'https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg'},
  {name:'Indian Trail', image: 'https://farm7.staticflickr.com/6193/6108828094_efc27cbbed.jpg'},
  {name:'Indian Trail', image: 'https://survivallife.com/wp-content/uploads/2017/06/campgrounds-feature.jpg'},
  {name:'Solo Site', image: 'https://pixabay.com/get/e830b90b2ef71c22d2524518b7444795ea76e5d004b0144597f6c471a4eabc_340.png'},
  {name:'Yaha Clan', image: 'https://pixabay.com/get/ea37b80c2ce90021d85a5854ee4d459fe270e7c818b4154393f5c97aa0e4_340.png'},
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
