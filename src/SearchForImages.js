import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import MyMapComponent from './MapElement.js';
import Tweets from './Tweets.js'

class SearchForImages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  getTweets = () =>{
    console.log('get tweets')
    this.setState({isLoading: true}, () =>{
      fetch('https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?geocode='+this.props.location.coordinates.lat+','+this.props.location.coordinates.lng+',20mi', {
        headers: {
          'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAALt86QAAAAAACmrEK9zGluXlGwOyN07eh3HHiAE%3DNtCUeytzF8snroLeS8Iu21DY91i3CjQIM568zmxcIU9frN9d2Y'
        }
      })
        .then(response =>{
          this.setState({isLoading: false})
          response.json()
            .then(data =>{
              var tweetsArray = data.statuses
              if (tweetsArray.length>10){
                tweetsArray.splice(10,tweetsArray.length-10)
              }
              console.log('tweets array: ',tweetsArray)
              this.props.setTweets(tweetsArray);
              //this.setState({tweets: tweetsArray})
            //  console.log('state: ',this.state.tweets)
            //  console.log("this.tweets: ",this.tweets)
            })
        })
    })
  }

  searchHandler = () =>{
    var searchAddress = this.refs.locationInput.value;
    var searchAddressNoSpace = searchAddress.split(' ').join('+');
    console.log(searchAddress)
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+searchAddressNoSpace)
      .then(response => {
        response.json()
          .then(data =>{
            if (data.status==='OK'){
              console.log(data.results[0].formatted_address)
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
      <div className="container">
        <h1 className="display-4" style={{marginTop: '20px', marginBottom: 20}}>Enter a location to search for tweets!</h1>
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
        {this.state.isLoading ? <div><i className="fa fa-spinner fa-spin" /> Loading...</div> : (this.props.tweets!=null &&<Tweets tweetsList={this.props.tweets}/>)}
      </div>
    )
  }
}

export default SearchForImages;
