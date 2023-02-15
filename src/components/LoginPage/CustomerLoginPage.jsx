import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import customerService from '../../utils/customerService';
import contractorService from '../../utils/contractorService';
class CustomerLoginPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      pw: ''
    };
  }
  
  handleChange = (e) => {
    // TODO: implement in an elegant way
    //console.log(e.target.name)
    this.setState({[e.target.name]: e.target.value})
  }

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
      await customerService.login(this.state);
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
        <header className="header-footer">Log In</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default">Log In</button>&nbsp;&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CustomerLoginPage;
