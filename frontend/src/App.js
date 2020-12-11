import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

import RegistrationComponent from './components/registartionPage';
import LoginComponent from './components/loginPage';
import ProfilePageComponent from './components/profile/profilePage';
import Homecomponent from './components/homePage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div class="navbar-header">
              <Link to={'/'} className="navbar-brand">Chat Application</Link>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/profile'} className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/register'} className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/login'} className="nav-link">Login</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route exact path='/' component={Homecomponent} />
            <Route path='/profile' component={ProfilePageComponent} />
            <Route path='/register' component={RegistrationComponent} />
            <Route path='/login' component={LoginComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

