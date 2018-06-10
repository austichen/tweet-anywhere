const Twit = require('twit');

function getTweetsFile(){
  var T = new Twit({
    consumer_key: 'ms3tLxXod1Ke3kMDUbDHFMkfj',
    consumer_secret: 'OG9HKEOsklNXasuF3aQ1yEO7UENIFNLWiLEHQBQLaQxYWjCmaM',
    app_only_auth: true
  })
  console.log('get tweets')
  T.get('search/tweets', {geocode: '37.781157,-122.398720,20mi'}, (err, data, response) =>{
    console.log(data);
  })
}

export default getTweetsFile;
