var express = require('express');
var app = express();
var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

var campgrounds = [
    {name: 'volkswagen', image: 'https://cdn.pixabay.com/photo/2013/07/13/11/36/volkswagen-158463_1280.png'},
    {name: 'salmon creek', image: 'https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg'},
    {name: 'salmon creek', image: 'https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg'}
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