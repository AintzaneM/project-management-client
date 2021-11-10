
import './App.css';
import React from 'react';
import ProjectList from './components/projects/ProjectList';
import { Switch, Route } from 'react-router-dom';
import TaskDetails from './components/tasks/TaskDetails';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import authService from './components/auth/auth-service';
import Navbar from './components/navbar/Navbar';
import ProjectDetails from './components/projects/ProjectDetails';
import ProtectedRoute from './components/auth/ProtectedRoute';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null
  };

  getTheUser = (userObj, loggedIn) => {
    this.setState({
      user: userObj,
      isLoggedIn: loggedIn
    });
  };

  fetchUser = () => {
    if (this.state.user === null) {
      authService
        .loggedin()
        .then(data => {
          this.setState({
            user: data,
            isLoggedIn: true
          });
        })
        .catch(err => {
          this.setState({
            user: null,
            isLoggedIn: false
          });
        });
    }
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {

    return (
      <div className="App">
        <Navbar userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} getUser={this.getTheUser} />
        
        <Switch>
          <Route exact path="/" render={props => <Login {...props} getUser={this.getTheUser} />} />
          <Route exact path="/signup" render={props => <Signup {...props} getUser={this.getTheUser} />} />
          <ProtectedRoute
            user={this.state.user}
            path="/projects/:id"
            component={ProjectDetails}
            />
          <ProtectedRoute
            user={this.state.user}
            path="/projects"
            component={ProjectList}
            />
          <ProtectedRoute
            path="/projects/:id/tasks/:taskId"
            component={TaskDetails}
            />
        </Switch>
      </div>
    );
  }

}
 


export default App;
