import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import CustomerLoginPage from './CustomerLoginPage';
import ContractorLoginPage from './ContractorLoginPage';
import customerService from '../../utils/customerService';
import contractorService from '../../utils/contractorService';
class LoginPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      message: ''
    };
    this.updateMessage = this.updateMessage.bind(this);
  }

  updateMessage(messageData){
    this.setState({
      message: messageData
    })
  }

  // handleChange = (e) => {
  //   // TODO: implement in an elegant way
  //   //console.log(e.target.name)
  //   this.setState({[e.target.name]: e.target.value})
  // }

  handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   this.props.setStateInUserAppJS(this.state);
    //   this.props.setIsUserLoggedIn();
    // } catch (err) {
    //   // Use a modal or toast in your apps instead of alert
    //   alert('Invalid Credentials!');
    // }
    try {
      // await customerService.login(this.state);
      //update user variable in state on successful login
      // this.props.setCurrentUser(userService.getUser())

      
    } catch (err) {
      console.log(err)
      // Invalid user data (probably duplicate email)
      //this.props.updateMessage(err.message);
    }
  }

  render() {
    return (
      <div className="LoginPage">
        <div>
          Login as Customer: 
          <CustomerLoginPage {...this.props} updateMessage={this.updateMessage}/>
          <p>{this.state.message}</p>
        </div>
        <div>
          Login as Contractor: 
          <ContractorLoginPage {...this.props} updateMessage={this.updateMessage}/>
          <p>{this.state.message}</p>
        </div>  
      </div>
    );
  }
}

export default LoginPage;