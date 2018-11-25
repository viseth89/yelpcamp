var express          = require('express'),
    methodOverride   = require('method-override'),
    expressSanitizer = require('express-sanitizer'),
    bodyParser       = require('body-parser'),
    mongoose         = require('mongoose'),
    app              = express();

mongoose.connect('mongodb://localhost/restufl_blog_app');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

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

//new route
app.get('/blogs/new', function(req, res){
  res.render('new')
});

//create route

app.post('/blogs', function(req, res){
  //create blog'
  console.log(req.body);
  req.body.blog.body = req.sanitize(req.body.blog.body)
  console.log('====================')
  console.log(req.body);
  Blog.create(req.body.blog, function(err, newBlog){
    if(err){
      res.render('new');
    } else {
      //then redirect to the index
      res.redirect('/blogs');
    }
  });
});

//SHOW route
app.get('/blogs/:id', function (req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      res.redirect('/blogs');
    } else {
      res.render('show', {blog: foundBlog});
    }
  });
})

//EDIT route
app.get('/blogs/:id/edit', function(req,res){
  req.body.blog.body = req.sanitize(req.body.blog.body)
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      res.redirect('/blogs');
    } else {
      res.render('edit', {blog:foundBlog});
    }
  });
});

//update route

app.put('/blogs/:id', function(req, res){
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if(err){
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs/' + req.params.id)
    }
  });
});

// DELETE route
app.delete('/blogs/:id', function(req, res){
  //destroy blogs
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs');
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
