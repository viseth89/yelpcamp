var express = require('express');
var app = express();
var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

var campgrounds = [
    {name: 'volkswagen', image: 'https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f7c570a0eeb3bd_340.jpg'},
    {name: 'salmon creek', image: 'https://pixabay.com/get/e83db50a2ff5083ed1584d05fb1d4e97e07ee3d21cac104491f7c570a0eeb3bd_340.jpg'},
    {name: 'salmon creek', image: 'https://pixabay.com/get/e83db50a2ff5083ed1584d05fb1d4e97e07ee3d21cac104491f7c570a0eeb3bd_340.jpg'},
    {name: 'volkswagen', image: 'https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f7c570a0eeb3bd_340.jpg'},
    {name: 'salmon creek', image: 'https://pixabay.com/get/e83db50a2ff5083ed1584d05fb1d4e97e07ee3d21cac104491f7c570a0eeb3bd_340.jpg'},
    {name: 'salmon creek', image: 'https://pixabay.com/get/e83db50a2ff5083ed1584d05fb1d4e97e07ee3d21cac104491f7c570a0eeb3bd_340.jpg'},
    {name: 'volkswagen', image: 'https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f7c570a0eeb3bd_340.jpg'},
    {name: 'salmon creek', image: 'https://pixabay.com/get/e83db50a2ff5083ed1584d05fb1d4e97e07ee3d21cac104491f7c570a0eeb3bd_340.jpg'},
    {name: 'salmon creek', image: 'https://pixabay.com/get/e83db50a2ff5083ed1584d05fb1d4e97e07ee3d21cac104491f7c570a0eeb3bd_340.jpg'},
]

app.get('/', function(req, res){
    res.render('landing')
});

app.get('/campgrounds', function(req, res){
    //Name:data passing in
    res.render('campgrounds', {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name
    var image = req.body.image
    var newCampground = {name:name, image: image}
    campgrounds.push(newCampground)
    // redirect back to campgrounds page
    res.redirect("/campgrounds") 
})

app.get("/campgrounds/new", function (req,res){
    res.render('new')
})

app.listen(3000);
console.log('YelpCamp has started on port 3000')