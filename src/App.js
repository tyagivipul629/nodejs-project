import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home';

class App extends React.Component {
  render(){
    return (
    <Switch>
      <Route exact path="/" render={(props)=>(<Home {...props} />)} />
    </Switch>
  );
  }
}

export default App;
