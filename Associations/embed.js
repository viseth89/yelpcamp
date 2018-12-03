var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo');

//post - title, content
var postSchema = new mongoose.Schema({
  title: String,
  content: String
});
var Post = mongoose.model('Post', postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
  email:String,
  name:String,
  posts:[postSchema]
});

var User = mongoose.model('User', userSchema);

// var newUser = new User({
//   email:'hermione@hogwarts.edu',
//   name:'Hermione Granger'
// });
//
// newUser.posts.push({
//   title:'how to brew juice',
//   content:'just kidding, go to class to learn it'
// });
//
// newUser.save(function(err,user){
//   if(err){
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

User.findOne({name:'Hermione Granger'}, function(err, user){
  if(err){
    console.log(err);
  } else {
    user.posts.push({
      title:'3 things I really hate',
      content:'Voldemort, voldemort VOLDEMORT'
    });
    user.save(function(err, user){
      if(err){
        console.log(err);
      } else {
        console.log(user)
      }
    });
  }
});


//
// var newPost = new Post({
//   title:'reflections on apples',
//   content: 'they are delicious'
// });
//
// newPost.save(function(err,post){
//   if(err){
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });
