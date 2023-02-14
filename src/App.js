import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
// import TimeZone from './components/TimeZone/TimeZone';
// import LocationAstronomy from './components/LocationAstronomy/LocationAstronomy';
// // import WeatherForecast from './components/WeatherForecast/WeatherForecast';
// import Home from './components/Home/Home';
// import LoginPage from './components/LoginPage/LoginPage';
// import LogoutPage from './components/Logout/Logout';
import styles from './App.module.css'
// import './utils/api_calls'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      pw: '',
      isUserLogedIn: false
    }
    this.dummyUser = {
      email: 'sarbTest@example.com',
      pw: 'testing'
    }
    
    this.getDummyUser = this.getDummyUser.bind(this);
    this.setUserInAppState = this.setUserInAppState.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.setIsUserLoggedIn = this.setIsUserLoggedIn.bind(this)
  }

  getLinks(){
    const links = [
      {
        label : 'Home',
        showAuth: this.state.isUserLogedIn ? true: false
      },
      {
        label : 'Location Astronomy',
        showAuth: this.state.isUserLogedIn ? true: false
      },
      {
        label : 'Find Time Zone',
        showAuth: this.state.isUserLogedIn ? true: false
      },
      {
        label : 'Login',
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
          path: `/Location Astronomy`,
          element: (
            this.state.email 
            ?
            // <LocationAstronomy />
            'Hi'
            :
            <Navigate to='/Login' replace/>
          )
        },
        {
          path: `/Find Time Zone`,
          element: (
            this.state.email 
            ?
            <TimeZone /> 
            : 
            <Navigate to='/Login' replace/>
          )
        },
        // {
        //   path: `/Weather Forecast`,
        //   element: <WeatherForecast /> ,
        // },
        {
          path: `/Login`,
          element: (
            this.state.email 
            ? 
            <Navigate to='/Home' />
            :
            <>
              <LoginPage 
                userData={this.getDummyUser}
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

  handleLogout(){
    this.setState({
      email: '',
      pw: '',
      isUserLogedIn : false
    })
  }


  getBaseRoute(){
    const baseRouter = createBrowserRouter(
      [
        {
          path: '/',
          element: (
                <>
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
