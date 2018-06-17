import React, { Component } from 'react';
import './styles/bootstrap.min.css';
import './styles/FontTitles.css'
import '../node_modules/font-awesome/css/font-awesome.min.css';
import ViewSavedTweets from './ViewSavedTweets';
import SearchForTweets from './SearchForTweets';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isViewSavedImages: false,
      mapIsOpen: false,
      location: {
        isFound: false,
        address: null,
        coordinates: {
          lat: 0,
          lng: 0
        }
      },
      showHideText: 'Show Map',
      tweets: null
    }
  }

  toggleSavedInArray = (searchId) =>{
    if(this.state.tweets!=null){
      this.state.tweets.map(element =>{
        if(element.tweetId == searchId){
          element.tweetIsSaved=!element.tweetIsSaved;
        }
      })
      this.setState({tweets: this.state.tweets});
    }
  }

  setLocationState = location => {
    this.setState({
      location: {
        isFound: true,
        address: location.formatted_address,
        coordinates: {
          lat: location.geometry.location.lat*1,
          lng: location.geometry.location.lng*1
        }
      }
    })
  }

  locationErrorHandler = () => {
    this.setState({location:{isFound: false}, tweets: null})
  }

  toggleMap = () =>{
    this.setState(this.state.mapIsOpen ? {showHideText: 'Show Map'} : {showHideText: 'Hide Map'})
    this.setState({mapIsOpen: !this.state.mapIsOpen})
  }

  setTweets = tweetsArray =>{
    this.setState({tweets: tweetsArray})
  }

  onClickHandler = () =>{
    this.setState({isViewSavedImages: !this.state.isViewSavedImages})
  }

  render() {
    let buttonText, body;
    if(this.state.isViewSavedImages){
      body=<ViewSavedTweets toggleSavedInArray={this.toggleSavedInArray}/>;
      buttonText="Search for Tweets";
    } else {
      body=<SearchForTweets
              setLocationState={this.setLocationState}
              locationErrorHandler={this.locationErrorHandler}
              toggleMap = {this.toggleMap}
              setTweets = {this.setTweets}
              mapIsOpen = {this.state.mapIsOpen}
              location = {this.state.location}
              tweets = {this.state.tweets}
              showHideText = {this.state.showHideText}
              toggleSavedInArray = {this.toggleSavedInArray}/>;
      buttonText = "View Saved Tweets";
    }

    return (
      <div className=" text-center">
        <header style={{backgroundColor: '#1dcaff', paddingBottom: '25px'}}>
          <h1 className="display-2" style={{paddingTop: 50, marginBottom: 10, color: 'white', fontFamily: "'Oxygen', sans-serif"}}>Welcome to Tweet Anywhere!</h1>
          <div style={{marginBottom: 10}}>
          <a href="https://github.com/austichen/twitter_app" title="View on Github" target="_blank" style={{fontSize: '3em', color: 'white'}}>
            <i className="fa fa-github" />
          </a>
          </div>
          <button type="button" className="btn btn-outline-light" onClick={this.onClickHandler} style={{marginTop: 10, fontFamily: "Open Sans"}}>{buttonText}</button>
        </header>
        {body}
      </div>
    );
  }
}

export default App;
