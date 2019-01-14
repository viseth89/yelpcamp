var express = require('express');
var app = express();

// so don't have to say 'landing.ejs'
app.set('view engine', 'ejs')

app.get('/', function(req, res){
    res.render('landing')
});

app.get('/campgrounds', function(req, res){
    var campgrounds = [
        {name: 'volkswagen', image: 'https://cdn.pixabay.com/photo/2013/07/13/11/36/volkswagen-158463_1280.png'},
        {name: 'salmon creek', image: 'https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg'},
        {name: 'salmon creek', image: 'https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg'}
    ]
                            //Name:data passing in
    res.render('campgrounds', {campgrounds:campgrounds});
});

app.listen(3000);
console.log('YelpCamp has started on port 3000')