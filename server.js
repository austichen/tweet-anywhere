const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

Tweet = require('./models/tweet')

mongoose.connect('mongodb://localhost/tweetcollection');

var db = mongoose.connection;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get('/api/tweets', function(req, res){
  Tweet.getTweets(function(err, tweets){
    if(err){
      throw err;
    }
    res.json(tweets);
  });
})

app.post('/api/tweets', function(req, res){
  console.log(req.body);
  Tweet.addTweet(req.body, (err, tweet) =>{
    if(err){
      throw err;
    }
    res.json(tweet);
  })
})

app.listen(5000, () => {console.log("listening on port 5000")});
