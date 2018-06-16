import React, { Component } from 'react';
import './bootstrap.min.css';
import './FontTitles.css'
import ViewSavedImages from './ViewSavedImages';
import SearchForImages from './SearchForImages';


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
      body=<ViewSavedImages/>;
      buttonText="Search for Tweets";
    } else {
      body=<SearchForImages
              setLocationState={this.setLocationState}
              locationErrorHandler={this.locationErrorHandler}
              toggleMap = {this.toggleMap}
              setTweets = {this.setTweets}
              mapIsOpen = {this.state.mapIsOpen}
              location = {this.state.location}
              tweets = {this.state.tweets}
              showHideText = {this.state.showHideText}/>;
      buttonText = "View Saved Tweets";
    }

    return (
      <div className=" text-center">
        <header style={{backgroundColor: '#1dcaff', paddingBottom: '25px'}}>
          <h1 className="display-2" style={{paddingTop: 50, marginBottom: 100, color: 'white', fontFamily: "'Oxygen', sans-serif"}}>Welcome to Tweet Anywhere!</h1>
          <button type="button" className="btn btn-outline-light" onClick={this.onClickHandler} style={{marginTop: 50, fontFamily: "Open Sans"}}>{buttonText}</button>
        </header>
        {body}
      </div>
    );
  }
}

export default App;
