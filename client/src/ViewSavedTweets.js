import React, { Component } from 'react';
import './styles/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import {TweetCard} from './Tweets.js';

class ViewSavedTweets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tweetsArray: [],
      isLoading: true
    }
  }

  getTweetsFromDB = () =>{
    this.setState({isLoading: true})
    fetch('api/tweets')
      .then(response => {response.json()
        .then(tweets => {this.setState({tweetsArray: tweets, isLoading: false})}
      )}, error =>{
        alert('Error retrieving Tweet data.')
        this.setState({isLoading: false})
      })
  }

  componentDidMount(){
    this.getTweetsFromDB();
  }

  render(){
    return(
      <div className="container" style={{paddingTop: '20px'}}>
        <h1 className="display-4" style={{color: '#a9a9a9', marginBottom: '50px'}}>Here are the Tweets you have saved.</h1>
        {(this.state.tweetsArray.length<1 && !this.state.isLoading) && <p className="text-muted"> There are no tweets to display. </p>}
        {this.state.isLoading && <div><i className="fa fa-spinner fa-spin" /> Loading...</div>}
        <div className="row">
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
              toggleSavedInArray={this.props.toggleSavedInArray}
            />
          )}
        </div>
      </div>
    )
  }
}

export default ViewSavedTweets;
