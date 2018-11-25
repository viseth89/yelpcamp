var express    = require('express'),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    app        = express();

mongoose.connect('mongodb://localhost/restufl_blog_app');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema ({
    title:String,
    image:String,
    body:String,
    created:{type:Date, default: Date.now}
});

var Blog = mongoose.model('blog', blogSchema);

app.get('/', function(req, res){
    res.render('index');
});

app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log('ERROR!');
        } else {
            res.render('index', {blogs:blogs});
        }
    });
});


// Blog.create({
//     title:'test blog',
//     image:'https://cdn.nba.net/nba-drupal-prod/styles/landscape_1280w/s3/2018-11/GettyImages-1057948114.jpg?itok=fd9McQHy',
//     body:'hello'
//
// });
//
//


app.listen(3000, function() {
    console.log('blog is serving on port 3000')
});
