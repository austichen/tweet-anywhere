const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  screenName:{
    type: String,
    required: true
  },
  text:{
    type: String,
    required:true
  },
  profileImageURL:{
    type: String,
    required: true
  },
  tweetId:{
    type: String,
    required: true
  },
  createdOn:{
    type: String,
    required: true
  },
  displayOrder: Number
});

const Tweet = module.exports = mongoose.model('Tweet', tweetSchema);

module.exports.getTweets = function(callback, limit){
  Tweet.find(callback).limit(limit);
}

module.exports.addTweet = function(tweetData, callback){
  Tweet.find({tweetId: tweetData.tweetId}, (err, tweet) =>{
    if(tweet){}
  })
  const tweet = tweetData;
  Tweet.create(tweet, callback);
}
