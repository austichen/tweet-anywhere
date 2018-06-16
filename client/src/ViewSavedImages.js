import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';
import {TweetCard} from './Tweets.js';

class ViewSavedImages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tweetsArray: []
    }
  }

  getTweetsFromDB = () =>{
    console.log('check')
    fetch('http://localhost:5000/api/tweets')
      .then(response => {response.json()
        .then(tweets => {this.setState({tweetsArray: tweets})}
      )}, error =>{
        alert('Error retrieving Tweet data.')
      })
  }

  componentDidMount(){
    this.getTweetsFromDB();
  }

  render(){
    return(
      <div  className="row" style={{marginTop: '50px'}}>
        {this.state.tweetsArray.map(element =>
          <TweetCard
            key={element._id}
            tweetId={element.tweetId}
            name={element.name}
            screenName={element.screenName}
            text={element.text}
            profileImageURL={element.profileImageURL}
            createdOn={element.createdOn}
            view={true}
            getTweetsFromDB={this.getTweetsFromDB}
          />
        )}
      </div>
    )
  }
}

export default ViewSavedImages;
