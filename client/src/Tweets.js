import React, { Component } from 'react';
import '../node_modules/font-awesome/css/font-awesome.min.css'

class TweetCard extends Component{
  constructor(props){
    super(props);
    this.state ={
      isSaving: false
    }
  }

  saveTweet = () =>{
    const tweetData = {
      name: this.props.name,
      screenName: this.props.screenName,
      text: this.props.text,
      profileImageURL: this.props.profileImageURL,
      tweetId: this.props.tweetId,
      createdOn: this.props.createdOn
    }
    this.setState({isSaving: true})
    fetch('api/tweets',{method: 'post', body:JSON.stringify(tweetData), headers:{'Content-Type': 'application/json'}})
      .then(response =>{
        response.json()
          .then(tweet => {
            this.props.toggleSavedInArray(this.props.tweetId);
            this.setState({isSaving: false})
          })
      }, error =>{
        alert('Error saving Tweet.');
        this.setState({isSaving: false});
      })
  }

  deleteTweet = () =>{
    const tweetId = this.props.tweetId;
    fetch(`api/tweets/${tweetId}`, {method: 'delete'})
      .then(response =>{
        if (!response.ok){
          alert('Database Error. Unable to delete.')
        } else{
          this.props.toggleSavedInArray(tweetId);
          this.props.getTweetsFromDB();
        }
      })
  }

  render(){
    return (
      <div className='col-md-6' style={{marginBottom: '30px'}}>
        <div className="card text-left">
          <div className="card-header">
          <img src={this.props.profileImageURL} style={{height: '48px', width: '48px', marginRight: '20px', float: 'left'}}/>
          <div style={{float: 'left'}}>
            <h5 style={{marginBottom:'2px'}}>{this.props.name}</h5>
            <a href={`https://twitter.com/${this.props.screenName}`} target='_blank'><p>@{this.props.screenName}</p></a>
          </div>
          <p style={{float:'right'}}>{this.props.createdOn}</p>
          </div>
          <div className="card-body">
            <p className="card-text">{this.props.text}</p>
            <a href={`https://twitter.com/${this.props.screenName}/status/${this.props.tweetId}`} target='_blank' className="btn btn-primary btn-sm" style={{float: 'left'}}>View on Twitter</a>

            {this.props.view ? (<button className="btn btn-danger btn-sm" style={{float: 'left', marginLeft: '10px'}} onClick={this.deleteTweet}>
                                    <i className="fa fa-bookmark"></i>  Remove Tweet
                                  </button>) :
                                  (<button className="btn btn-secondary btn-sm" disabled={this.state.isSaving || this.props.tweetIsSaved} style={{float: 'left', marginLeft: '10px'}} onClick={this.saveTweet}>
                                    <i className="fa fa-bookmark"></i>  {this.props.tweetIsSaved ? 'Saved' : 'Save Tweet'}
                                  </button>)
                                }
          </div>
        </div>
      </div>
    )
  }
}

class Tweets extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="row" style={{marginTop: '50px'}}>
        {this.props.tweetsList.map((element) => (
          <TweetCard
            key={element.id}
            tweetId={element.tweetId}
            name={element.name}
            screenName={element.screenName}
            text={element.text}
            profileImageURL={element.profileImageURL}
            createdOn={element.createdOn}
            tweetIsSaved = {element.tweetIsSaved}
            toggleSavedInArray = {this.props.toggleSavedInArray}
          />
        ))}
      </div>
    )
  }
}

export default Tweets;
export {TweetCard};
