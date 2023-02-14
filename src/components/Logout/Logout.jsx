import React, { Component } from 'react';

class LogoutPage extends Component {
  constructor(props){
    super(props);
    this.initialLoader = 1
  }
  
  handleOnLoad(){
    if(this.initialLoader === 1){
      this.props.handleLogout();
      this.initialLoader++;
    }
  }

  render() {
    return (
      <div className="LoginPage" onLoad={this.handleOnLoad()}>
        Logout
      </div>
    );
  }
}

export default LogoutPage;
