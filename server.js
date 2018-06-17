const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

Tweet = require('./models/tweet')

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds163680.mlab.com:63680/tweet_database`);

var db = mongoose.connection;

const port = process.env.PORT || 5000;

app.use(express.static('client/build'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods",  "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get('/api/tweets', function(req, res){
  Tweet.getTweets(function(err, tweets){
    if(err){
      res.sendStatus(500);
    }
    res.json(tweets);
  });
})

app.post('/api/tweets', function(req, res){
  Tweet.addTweet(req.body, (err, tweet) =>{
    if(err){
      res.sendStatus(500);
    }
    res.json(tweet).status(200);
  })
})

app.get('/api/tweets/find', function(req, res){
  const tweetIds = req.query.id
  Tweet.findTweetsById(tweetIds, (err, tweets) =>{
    if(err){
      res.sendStatus(500);
    } else{
      var foundIds = [];
      tweets.map(element =>{
        foundIds.push(element.tweetId)
      })
      res.json(foundIds);
    }

  })
})

app.delete('/api/tweets/:tweetId',(req, res) =>{
  const tweetId = req.params.tweetId;
  Tweet.deleteTweet(tweetId, (err, tweet) =>{
    if(err){
      res.sendStatus(500)
    }
    res.sendStatus(200)
  })
})

app.listen(port, () => {console.log("listening on port 5000")});
