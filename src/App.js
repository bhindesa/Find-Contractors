import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate, redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/SignupPage/SignupPage';
import LogoutPage from './components/Logout/Logout';
import styles from './App.module.css'
import Banner from './components/Banner/Banner';
import userService from './utils/customerService'
// import tokenService from './utils/tokenService';
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      // email: '',
      // pw: '',
      isUserLogedIn: false,
      user: userService.getUser(),
    }
    this.dummyUser = {
      email: 'sarbTest@example.com',
      pw: 'testing'
    }
    
    this.setUserInAppState = this.setUserInAppState.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.setIsUserLoggedIn = this.setIsUserLoggedIn.bind(this)
  }

  redirectToLogin(){
    console.log('checking for user...')
    const currentUser = userService.getUser()
    if(!currentUser){
      return redirect('/login')
    }
    return null    
  }

  setCurrentUser(userData){
    this.setState({user: userData})
  }

  handleSignup = () => {
    this.setState({user: userService.getUser()});
  }

  handleLogout(){
    userService.logout();
    this.setState({
      user: null,
      isUserLogedIn : false
     });
  }


  getLinks(){
    const links = [
      {
        label : 'Home',
        showAuth: this.state.isUserLogedIn ? true: false
      },
      {
        label : 'Add Service',
        showAuth: this.state.isUserLogedIn ? true: false
      },
      {
        label : 'Login',
        showAuth: this.state.isUserLogedIn ? false: true
      },
      {
        label : 'Sign Up',
        showAuth: this.state.isUserLogedIn ? false : true
      },
      {
        label : 'Logout',
        showAuth: this.state.isUserLogedIn ? true: false
      }
    ]
    return links;
  }


  getChildRoutes(){
    const childernRoutes =[
        {
          path: `/Home`,
          element: (
            this.state.email 
            ? 
            <Home />
            : 
            <Navigate to='/Login' replace/>
          )
        },
        {
          path: `/Add Service`,
          // element: (
            // this.state.email 
            // ?
            // <LocationAstronomy />
            // :
            // <Navigate to='/Login' replace/>
          // )
        },
        {
          path: `/Sign Up`,
          element: (
          //   this.state.email 
          //   ?
            <SignupPage />
          //   : 
          //   <Navigate to='/Login' replace/>
          )
        },
        {
          path: `/Weather Forecast`,
          // element: <WeatherForecast /> ,
        },
        {
          path: `/Login`,
          element: (
            // this.user
            // ? 
            // <Navigate to='/Home' />
            // :
            <>
              <LoginPage 
                setStateInUserAppJS={this.setUserInAppState}
                setIsUserLoggedIn={this.setIsUserLoggedIn}
              />
            </>
           
          )
        },
        {
          path: `/Logout`,
          element: (
            <>
            <LogoutPage handleLogout={this.handleLogout}/> 
            <Navigate to='/Login'  replace/>
            </>
            
          )
        }
    ];
    return childernRoutes;
  }

  getDummyUser(){
    return this.dummyUser;
  }

  setUserInAppState(data){
    this.setState({
      email: data.email,
      pw: data.pw
    })
  }

  setIsUserLoggedIn(){
    this.setState({
      isUserLogedIn : true
    })
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
                    loggedInUserEmail={this.state.email}/>
                  <Outlet />
                </>
            ),
          children: this.getChildRoutes()
        }
      ]
    );
    return baseRouter;
  }

  componentDidMount(){
    console.log(this.state)
  }

  componentDidUpdate(){
    console.log(this.state)
  }

  render(){
    return (
      <div className={styles.App}>
        <RouterProvider router={this.getBaseRoute()} />
      </div>
  );}
}

export default App;
