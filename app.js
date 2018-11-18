var express = require('express')
// var request = require('request')
var app = express();
app.set('view engine', 'ejs')

app.get('/', function(req, res){
  res.render('landing');
});

app.get('/campgrounds', function(req, res){
  var campgrounds = [
    {name:'Solo Site', image: 'https://survivallife.com/wp-content/uploads/2017/06/campgrounds-feature.jpg'},
    {name:'Yaha Clan', image: 'https://survivallife.com/wp-content/uploads/2017/06/campgrounds-feature.jpg'},
    {name:'Indian Trail', image: 'https://survivallife.com/wp-content/uploads/2017/06/campgrounds-feature.jpg'},
    {name:'Indian Trail', image: 'https://survivallife.com/wp-content/uploads/2017/06/campgrounds-feature.jpg'},
    {name:'Indian Trail', image: 'https://survivallife.com/wp-content/uploads/2017/06/campgrounds-feature.jpg'},
    {name:'Indian Trail', image: 'https://survivallife.com/wp-content/uploads/2017/06/campgrounds-feature.jpg'}

  ]

  res.render('campgrounds', {campgrounds:campgrounds})
});


app.listen(3000,function(){
  console.log('YelpCamp is serving on port 3000');
});
