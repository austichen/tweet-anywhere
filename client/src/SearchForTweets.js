import React, { Component } from 'react';
import './styles/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import MyMapComponent from './MapElement.js';
import Tweets from './Tweets.js'

class SearchForTweets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  findAlreadySavedTweets = (tweetsArray) =>{
    var queryString="?";
    tweetsArray.map((element, index) =>{
      if(index == tweetsArray.length-1){
        queryString+=`id=${element.tweetId}`;
      } else {
        queryString+=`id=${element.tweetId}&`;
      }
    })
    fetch(`api/tweets/find${queryString}`)
      .then(response =>{
        if (!response.ok){
          alert('Database Error. Unable to search through Database')
        } else{
          response.json()
            .then(foundIdsArray =>{
              tweetsArray.map(tweet =>{
                foundIdsArray.map(foundId =>{
                  if(tweet.tweetId == foundId) {
                    tweet.tweetIsSaved = true;
                  }
                })
              })
            })
        }
      })
  }

  getTweets = () =>{
    console.log('auth token:',process.env.REACT_APP_GOOGLE_MAPS_AUTH)
    this.setState({isLoading: true}, () =>{
      fetch('https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?geocode='+this.props.location.coordinates.lat+','+this.props.location.coordinates.lng+',20mi', {
        headers: {
          'Authorization': process.env.REACT_APP_TWITTER_AUTH
        }
      })
        .then(response =>{
          this.setState({isLoading: false})
          response.json()
            .then(data =>{
              if (data.statuses.length>10){
                data.statuses.splice(10,data.statuses.length-10)
              }
              var tweetsArray = []
              data.statuses.map(element =>{
                tweetsArray.push({
                  key: element.id,
                  tweetId: element.id_str,
                  name: element.user.name,
                  screenName: element.user.screen_name,
                  text: element.text,
                  profileImageURL: element.user.profile_image_url_https,
                  createdOn: element.created_at,
                  tweetIsSaved: false
                })
              })
              this.findAlreadySavedTweets(tweetsArray);
              this.props.setTweets(tweetsArray);
            })
        })
    })
  }

  searchHandler = () =>{
    var searchAddress = this.refs.locationInput.value;
    var searchAddressNoSpace = searchAddress.split(' ').join('+');
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchAddressNoSpace}&key=${process.env.REACT_APP_GOOGLE_MAPS_AUTH}`)
      .then(response => {
        response.json()
          .then(data =>{
            if (data.status==='OK'){
              this.props.setLocationState(data.results[0])
              /*
              this.setState({location: {
                              isFound: true,
                              address: data.results[0].formatted_address,
                              coordinates: {
                                lat:data.results[0].geometry.location.lat*1,
                                lng: data.results[0].geometry.location.lng*1
                              }
                            }})
              */
              this.getTweets();
            }
            else{
              alert('Error - location not found');
              this.props.locationErrorHandler();
              //this.setState({location: {isFound: false}})
            }
            //this.state.locationAddress =
          })
      })

  }


  render(){
    return (
      <div style={{paddingTop: '20px'}}>
      <div className="container">
        <h1 className="display-4" style={{ marginBottom: 20, color: '#a9a9a9'}}>Enter a location to search for tweets!</h1>
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-lg">Location</span>
          </div>
          <input type="text" ref="locationInput" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Enter a city, mall, etc"/>
          <div className="input-group-append">
            <button className="btn btn-outline-info" type="button" onClick={this.searchHandler}>Search</button>
          </div>
          <button className="btn btn-primary" onClick={this.props.toggleMap} style={{marginLeft: 30}}>{this.props.showHideText}</button>
        </div>
        <p className="lead" style={{marginTop: '10px'}}>{this.props.location.address}</p>
        {this.props.mapIsOpen && <MyMapComponent
                                    isMarkerShown={this.props.location.isFound ? true : false}
                                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDntOM15J1DB6Sm4Ej91v2n_mkXe61zKyU&v=3.exp&libraries=geometry,drawing,places"
                                    loadingElement={<div style={{ height: `100%` }} />}
                                    containerElement={<div style={{ height: `400px` }} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                                    coordinates={this.props.location.isFound ? this.props.location.coordinates : {lat: 0, lng: 0}}
                                    zoom={this.props.location.isFound ? 15 : 1}
                                    />}
        {this.state.isLoading ? <div><i className="fa fa-spinner fa-spin" /> Loading...</div> : (this.props.tweets!=null &&<Tweets tweetsList={this.props.tweets} toggleSavedInArray={this.props.toggleSavedInArray}/>)}
      </div>
      </div>
    )
  }
}

export default SearchForTweets;
