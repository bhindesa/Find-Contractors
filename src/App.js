import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate, redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/SignupPage/SignupPage';
import LogoutPage from './components/Logout/Logout';
import styles from './App.module.css'
import Banner from './components/Banner/Banner';
import customerService from './utils/customerService';
import contractorService from './utils/contractorService';
import AddService from './components/AddService/AddService';
// import ListAllService from './components/ListAllServices/ListAllServices';
import ServiceDetails from './components/ServiceDetails/ServiceDetails';
import ContractorDetails from './components/ContractorDetails/ContractorDetails';
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isCustomerLoggedIn: false,
      isContractorLoggedIn: false,
      customerUser: '',
      contractorUser: ''
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLoginOrSignup = this.handleLoginOrSignup.bind(this);
  }

  componentDidMount(){
    console.log(this.state)
  }

  // componentDidUpdate(){
  //   console.log(this.state)
  // }

  // redirectToLogin(){
  //   console.log('checking for user...')
  //   const currentUser = customerService.getUser()
  //   if(!currentUser){
  //     return redirect('/login')
  //   }
  //   return null    
  // }

  handleLoginOrSignup(whichUserLoggedInOrSignedUp){
    if(whichUserLoggedInOrSignedUp === 'customer'){
      this.setState({
          customerUser: customerService.getUser(),
          isCustomerLoggedIn: !(this.state.isCustomerLoggedIn)
      });
      } else {
        this.setState({
          contractorUser: contractorService.getUser(),
          isContractorLoggedIn: !(this.state.isContractorLoggedIn)
        });
      }
  }

  handleLogout(){
    if(this.state.isCustomerLoggedIn){
      customerService.logout();
      this.setState({
        customerUser: null,
        isCustomerLoggedIn : false
       });
    } else {
      contractorService.logout();
      this.setState({
        contractorUser: null,
        isContractorLoggedIn : false
       });
    }
    
  }

  getLinks(){
    const links = [
      {
        label : 'Home',
        showAuth: this.state.isCustomerLoggedIn || this.state.isContractorLoggedIn ? true: false
      },
      {
        label : 'Add Service',
        showAuth:  this.state.isContractorLoggedIn ? true : false
      },
      {
        label : 'Login',
        showAuth: this.state.isCustomerLoggedIn || this.state.isContractorLoggedIn ? false: true
      },
      {
        label : 'Sign Up',
        showAuth: this.state.isCustomerLoggedIn || this.state.isContractorLoggedIn ? false : true
      },
      {
        label : 'Logout',
        showAuth: this.state.isCustomerLoggedIn || this.state.isContractorLoggedIn ? true : false
      }
    ]
    return links;
  }


  getChildRoutes(){
    const childernRoutes =[
        {
          path: `/Home`,
          element: (
            this.state.customerUser || this.state.contractorUser
            ? 
            <>
              <Home />
              <Outlet />,
            </>
            : 
            <Navigate to='/Login' replace/>
          )
        },
        {
          path: `/Add Service`,
          element: (
            this.state.customerUser || this.state.contractorUser
            ?
            <AddService />
            :
            <Navigate to='/Login' replace/>
          )
        },
        {
          path: `/Sign Up`,
          element: (
            this.state.customerUser || this.state.contractorUser
            ?
            <Navigate to='/Home' replace/>
            : 
            <SignupPage handleLoginOrSignup={this.handleLoginOrSignup}/>
          )
        },
        {
          path: `/Login`,
          element: (
            this.state.customerUser || this.state.contractorUser
            ? 
            <Navigate to='/Home' />
            :
            <>
              <LoginPage handleLoginOrSignup={this.handleLoginOrSignup}/>
            </>
           
          )
        },
        {
          path: `/Logout`,
          element: (
            this.state.customerUser || this.state.contractorUser
            ?
            <LogoutPage  handleLogout = {this.handleLogout} />
            :
            <>
              <Navigate to='/Home'  replace/>
            </>
            
          )
        },
        {
          path: `/services/:serviceId`,
          element: (
            this.state.customerUser || this.state.contractorUser
            ?
            <ServiceDetails />
            :
            <Navigate to='/Login' replace/>
          )
        },
        {
          path: `/contractors/:contractorId`,
          element: (
            this.state.customerUser || this.state.contractorUser
            ?
            <ContractorDetails />
            :
            <Navigate to='/Login' replace/>
          )
        }
    ];
    return childernRoutes;
  }



  getBaseRoute(){
    const baseRouter = createBrowserRouter(
      [
        {
          path: '/',
          element: (
                <>
                  <Banner />
                  <Navbar 
                    navLinks={this.getLinks()}
                    loggedInUserFirstname={ customerService.getUser() ? customerService.getUser().firstname : null }/>
                  <Outlet />
                </>
            ),
          children: this.getChildRoutes()
        }
      ]
    );
    return baseRouter;
  }

  render(){
    return (
      <div className={styles.App}>
        <RouterProvider router={this.getBaseRoute()} />
      </div>
  );}
}

export default App;
