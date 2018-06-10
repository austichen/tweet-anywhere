import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';
import ViewSavedImages from './ViewSavedImages';
import SearchForImages from './SearchForImages';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isViewSavedImages: false
    }
  }

onClickHandler = () =>{
    this.setState({isViewSavedImages: !this.state.isViewSavedImages})
  }

  render() {
    let buttonText, body;
    if(this.state.isViewSavedImages){
      body=<ViewSavedImages/>;
      buttonText="Search for Images";
    } else {
      body=<SearchForImages/>;
      buttonText = "View Saved Images";
    }

    return (
      <div className=" text-center">
        <header>
          <h1 className="display-2" style={{marginTop: 50, marginBottom: 100}}>Welcome to the Tweet around the world!</h1>
        </header>
        <button type="button" className="btn btn-outline-primary" onClick={this.onClickHandler} style={{marginTop: 50}}>{buttonText}</button>
        {body}
      </div>
    );
  }
}

export default App;
