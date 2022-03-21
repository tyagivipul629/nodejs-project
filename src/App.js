import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home';
import Login from './Login';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      loading: true,
      loggedIn: false,
      user: ''
    }
  }

  componentDidMount(){
   fetch('http://localhost:4000/home',{
     method: 'GET',
     headers:{
       "Content-Type": "application/json",
       "Accept": "application/json",
       "Access-Control-Allow-Origin" : "*"
     },
     credentials: 'include'
   }).then(res=>res.json()).then(res=>{
     if(res.status=='success'){
      this.setState({
        loading: false,
        loggedIn: true,
        user: res.user
      })
     }
     else{
       this.setState({
         loading: false
       })
     }
   })
  }

  setUser=(user)=>{
    this.setState({
        loggedIn: true,
        user: user
    })
}
  unsetUser=()=>{
    this.setState({
      loggedIn: false,
      user: ""
  })
  }

  render(){
    return (
      <>
    {this.state.loading?<h1>Loading...</h1>:<Switch>
      <Route exact path="/" render={(props)=>(<Home {...props} loggedIn={this.state.loggedIn} user={this.state.user} unsetUser={this.unsetUser} />)} />
      <Route exact path="/login" render={(props)=>(<Login {...props} loggedIn={this.state.loggedIn} setUser={this.setUser} />)} />
    </Switch>}
    </>
  );
  }
}

export default App;







