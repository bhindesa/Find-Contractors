import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import customerService from '../../utils/customerService';
import contractorService from '../../utils/contractorService';
class SignupForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConf: '',
      name: '',
      firstname: '',
      lastname: '',
      dob: '',
      address: '',
      phone: '',
      isContractor: false,
      companyName: '',
      companyLicenseNumber : '',
      companyRegisterYear: ''
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }
  

  handleChange = (e) => {
    this.props.updateMessage('');
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customerService.signupCustomer(this.state);
      this.props.handleSignup()
      // this.props.handleSignupOrLogin();
    } catch (err) {
      // Invalid user data (probably duplicate email)
      console.log(err)
      // this.props.updateMessage(err.message);
    }
  }

  handleCheckboxChange(e){
    e.preventDefault();
    this.setState(state => {
      return {
        isContractor : !(state.isContractor)
      }
    })
  }


  isFormInvalid() {

    if(this.state.isContractor){
      return !(
        this.state.email 
        && this.state.password === this.state.passwordConf
        && this.state.firstname 
        && this.state.lastname
        && this.state.dob
        && this.state.address
        && this.state.phone
        && this.state.companyName
        && this.state.companyLicenseNumber
        && this.state.companyRegisterYear
        );
    } else {
      return !(
        this.state.email 
        && this.state.password === this.state.passwordConf
        // && this.state.firstname 
        // && this.state.lastname
        // && this.state.dob
        // && this.state.address
        // && this.state.phone
        );
    }
   
  }

  render() {
    return (
      <div>
        <header className="header-footer">Sign Up</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="email">Email: </label>
              <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="password">Password: </label>
              <input type="password" className="form-control" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="passwordConf">Confirm Password: </label>
              <input type="password" className="form-control" placeholder="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} />
            </div>
          </div>
          {/* <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="firstname">Firstname: </label>
              <input type="text" className="form-control" placeholder="First Name" value={this.state.firstname} name="firstname" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="lastname">Lastname: </label>
              <input type="text" className="form-control" placeholder="Last Name" value={this.state.lastname} name="lastname" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="dob">Date of Birth: </label>
              <input type="date" className="form-control" placeholder="Date of Birth" value={this.state.dob} name="dob" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="address">Address: </label>
              <input type="text" className="form-control" placeholder="Your Address" value={this.state.address} name="address" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="phone">Phone: </label>
              <input type="text" className="form-control" placeholder="Phone Number" value={this.state.phone} name="phone" onChange={this.handleChange} />
            </div>
          </div> */}
          <div className="form-group">
            <div className="col-sm-12">
              <label htmlFor="isContractor">Are you a contractor: </label>
              <input type="checkbox" checked={this.state.isContractor} onChange={this.handleCheckboxChange} />
            </div>
          </div>

          {
            this.state.isContractor &&
            <div>
              <div className="form-group">
                <div className="col-sm-12">
                  <label htmlFor="companyName">Company Name: </label>
                  <input type="text" className="form-control" placeholder="Company Name" value={this.state.companyName} name="companyName" onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-12">
                  <label htmlFor="companyLicenseNumber">Company License Number: </label>
                  <input type="text" className="form-control" placeholder="Company Liense Number" value={this.state.companyLicenseNumber} name="companyLicenseNumber" onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-12">
                  <label htmlFor="companyRegisterYear">Company Register Year: </label>
                  <input type="number" className="form-control" placeholder="Company Registered Year" value={this.state.companyRegisterYear} name=".companyRegisterYear" onChange={this.handleChange} />
                </div>
              </div>
            </div>
          }
          
          
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default" disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;
