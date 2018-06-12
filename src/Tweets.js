import React, { Component } from 'react';
import '../node_modules/font-awesome/css/font-awesome.min.css'

class TweetCard extends Component{
  constructor(props){
    super(props);
    this.state={
      name: this.props.name,
      screenName: this.props.screenName,
      text: this.props.text,
      profileImageURL: this.props.profileImageURL
    }
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
            <button className="btn btn-secondary btn-sm" style={{float: 'left', marginLeft: '10px'}}>
              <i className="fa fa-bookmark"></i>  Save Tweet
            </button>
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
    console.log('tweets: ',this.props.tweetsList)
    return (
      <div className="row" style={{marginTop: '50px'}}>
        {this.props.tweetsList.map((element) => <TweetCard
                                                      key={element.id}
                                                      tweetId={element.id_str}
                                                      name={element.user.name}
                                                      screenName={element.user.screen_name}
                                                      text={element.text}
                                                      profileImageURL={element.user.profile_image_url_https}
                                                      createdOn={element.created_at}/>)}
      </div>
    )
  }
}

export default Tweets;
