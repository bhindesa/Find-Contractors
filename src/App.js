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
// import tokenService from './utils/tokenService';
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

  componentDidUpdate(){
    console.log(this.state)
  }

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

  // handleLogin()

  // }

  handleLogout(){
    if(this.state.isCustomerLoggedIn){
      customerService.logout();
      this.setState({
        customerUser: null,
        isCustomerLoggedIn : false
       });
    } else {

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
        showAuth: this.state.isCustomerLoggedIn || this.state.isContractorLoggedIn ? true: false
      }
    ]
    return links;
  }


  getChildRoutes(){
    const childernRoutes =[
        {
          path: `/Home`,
          element: (
            this.state.customerUser
            ? 
            <Home />
            : 
            <Navigate to='/Login' replace/>
          )
        },
        {
          path: `/Add Service`,
          // element: (
            // this.state.customer
            // ?
            // <LocationAstronomy />
            // :
            // <Navigate to='/Login' replace/>
          // )
        },
        {
          path: `/Sign Up`,
          element: (
            this.state.customerUser   
            ?
            <Navigate to='/Home' replace/>
            : 
            <SignupPage handleLoginOrSignup={this.handleLoginOrSignup}/>
          )
        },
        {
          path: `/Weather Forecast`,
          // element: <WeatherForecast /> ,
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
            <LogoutPage handleLogout={this.handleLogout}/> 
            :
            <>
              <Navigate to='/Home'  replace/>
            </>
            
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
