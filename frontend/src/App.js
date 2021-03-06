import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import RegistrationComponent from './components/registartionPage';
import LoginComponent from './components/loginPage';
import ProfilePageComponent from './components/profilePage';
import UploadFileComponent from './components/uploadFilePage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="navbar-header">
              <Link to={'/'} className="navbar-brand"><h1>Chat Application</h1></Link>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/register'} className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/login'} className="nav-link">Login</Link>
                </li>
              </ul>
            </div>
          </nav> */}
          <div className="jumbotron">
            <h3>Chat Application</h3>
          </div>
          <Switch>
            <Route exact path='/' component={LoginComponent} />
            <Route path='/profile' component={ProfilePageComponent} />
            <Route path='/register' component={RegistrationComponent} />
            <Route path='/login' component={LoginComponent} />
            <Route path='/upload' component={UploadFileComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

