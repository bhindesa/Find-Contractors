import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import contractorService from '../../utils/contractorService';

class ContractorLoginPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      pw: ''
    };
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(this.state)
      const loginContractorSuccessful = await contractorService.login(this.state);
      if(loginContractorSuccessful){
        this.props.handleLoginOrSignup('contractor');
      }
    } catch (err) {
      // console.log(err)
      this.props.updateMessage(err);
    }
  }

  render() {
    return (
      <div className="LoginPage">
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
              <button className="btn btn-default">Contractor Log In</button>&nbsp;&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ContractorLoginPage;
