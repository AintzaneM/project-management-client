
import './App.css';
import React from 'react';
import ProjectList from './components/projects/ProjectList';
import { Switch, Route } from 'react-router-dom';
import TaskDetails from './components/tasks/TaskDetails';


import Navbar from './components/navbar/Navbar';
import ProjectDetails from './components/projects/ProjectDetails';

class App extends React.Component {
  render() {

    return (
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/projects" component={ProjectList}/>
          <Route  exact path="/projects/:id" component={ProjectDetails} />
          <Route exact path="/projects/:id/tasks/:taskId" component={TaskDetails} /> {/* <== !!! */}
        </Switch>
      </div>
    );
  }

}
 


export default App;
