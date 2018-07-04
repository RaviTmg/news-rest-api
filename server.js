// BASE SETUP
// =============================================================================

var express = require('express');
var app = express();
var bodyparser = require('body-parser')
var mongoose   = require('mongoose');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

mongoose.connect('mongodb://ravitmg:ko123rav@ds161780.mlab.com:61780/news_app');

var News = require('./models/news.js')

var port = process.env.PORT || 3000;

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


router.get('/', function(req, res) {
    res.json({ message: 'welcome to our api!' });   
});

router.route('/news')

    // create a bear (accessed at POST http://localhost:8080/api/addnews)
    .post(function(req, res) {

        var news = new News();      // create a new instance of the News model
        news.name = req.body.name;  // set the bears name (comes from the request)
        news.title = req.body.title;
        news.categor = req.body.categor;
        news.timestamp = Date.now();
        // save the bear and check for errors
        news.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'News created!' });
        });

    })
    
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        News.find(function(err, news) {
            if (err)
                res.send(err);

            res.json(news);
            console.log(Date.now()-news.timestamp);
        });
    });

router.route('/news/:news_id')
    .get(function(req,res){
        News.findById(req.params.news_id,function(err,news){
            if(err)
                res.send(err);
            res.json(news);
        });
        
    })
    .put(function(req,res){
        News.findById(req.params.news_id,function(err,news){
            if(err)
                res.send(err);
            news.name = req.body.name;

            news.save(function(err){
                if(err)
                    res.send(err);
                res.json({message:'updated successfully'});
            });
        });
    })
    .delete(function(req,res){
        News.remove({
            _id:req.params.news_id
        }, function(err,news){
            if(err)
                res.send(err);
            res.json({message:'deleted successfully'});
        });
    });
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api',router);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('magic hapens on port: ', +port);       
