var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment')

var data = [

  {
    name: 'Luc',
    image: 'https://pbs.twimg.com/media/CpiAC7HUkAAiEKi.jpg',
    description: 'blah blah blah'
  },
  {
    name: 'Jackie',
    image: 'https://images.complex.com/complex/image/upload/c_limit,w_680/fl_lossy,pg_1,q_auto/alooky9m4igizfkn6stx.jpg',
    description: 'blfdasfdsafwah blah blah'
  },
  {
    name: 'menge',
    image: 'https://images.complex.com/complex/image/upload/c_limit,w_680/fl_lossy,pg_1,q_auto/xqvcpw6latd8nuvquag7.jpg',
    description: 'blah blah bla dasfasfh'
  }

]

function seedDB() {
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('removed campgrounds')
    //add a few campgrounds
    data.forEach(function(seed){
      Campground.create(seed,function(err, campground){
        if(err){
          console.log(err)
        } else {
          console.log('added a campground')
          Comment.create(
            {
              text:'this place is great',
              author:'homer'
            }, function(err, comment){
              if(err){
                console.log(err)
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log('created new comment')
              }
            });
        }
      })
    })
  });
  //add a few campgrounds

}

module.exports = seedDB;
