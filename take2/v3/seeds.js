var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment')
var data = [
    {
        name:'Cloud Rest',
        image: 'https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/munmorah-state-conservation-area/freemans-campground/freemans-campground-03.jpg',
        description:'blah blah blah'
    },
    {
        name:'Rest',
        image: 'https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg',
        description:'blah blah blah'
    },
    {
        name:'Cloud Rest',
        image: 'https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/munmorah-state-conservation-area/freemans-campground/freemans-campground-03.jpg',
        description:'blah blah blah'
    },
]

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        } 
        console.log('removed campgrounds')
        data.forEach(function(seed){
            Campground.create(seed, function(err,campground) {
                if(err){
                    console.log(err)
                } else {
                    console.log('added a campground')
                    // create a comment
                    Comment.create(
                        {
                            text: 'This place is great, but I wish there was internet',
                            author: 'homer'
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment)
                                campground.save();
                                console.log('created new comment')
                            }
                        });
                }
            })
        })
    });

}

module.exports = seedDB;
