import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home/home';
import Login from './components/Login/login';
import Signup from './components/Signup/signup';
import Description from './components/Description/description';
import Notification from './components/Notification/notification';
import Cart from './components/Cart/cart';
import WishList from './components/WishList/wishlist';
import Profile from './components/Profile/profile';
import Navbar from './components/Navbar/navbar';
import Orders from './components/Orders/orders';
import Search from './components/Search/search';
import Test from './components/Test';
import axios from 'axios';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      username: '',
      userid: '',
      cartCount: 0,
      notifCount: 0
    }
  }

  fetchCartAndNotification=async(userid)=>{
    //const cartres=await axios.get('/cartcount');
    //const notifres=await axios.get('/notifcount');
    this.setState({
      cartCount: 3,
      notifCount: 4,
      userid: userid
    })
  }

  componentDidMount(){
    const username=localStorage.getItem('user');
    const userid=localStorage.getItem('userid');

    if(username!==null&&userid!==null){
      this.fetchCartAndNotification(userid);
    }
  }

  unsetUser=()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('userid');
    this.setState({
      userid: ''
    })
  }

  setUser=(name, id)=>{
    this.setState({
      username: name,
      userid: id
    },()=>{
      this.fetchCartAndNotification(id);
    })
  }

  render(){
    return (
      <>
      <Navbar userid={this.state.userid} cartCount={this.state.cartCount} 
      notifCount={this.state.notifCount} unsetUser={this.unsetUser} />
      
    <Switch>
      <Route exact path="/" render={(props)=>(<Home {...props} />)} />
      <Route exact path="/login" render={(props)=>(<Login {...props} setUser={this.setUser} />)} />
      <Route exact path="/signup" render={(props)=>(<Signup {...props} />)} />
      <Route exact path="/description/:name" render={(props)=>(<Description {...props} />)} />
      <Route exact path="/cart" render={(props)=>(<Cart {...props} />)} />
      <Route exact path="/search" render={(props)=>(<Search {...props} />)} />
      <Route exact path="/notification" render={(props)=>(<Notification {...props} />)} />
      <Route exact path="/wishlist" render={(props)=>(<WishList {...props} />)} />
      <Route exact path="/profile" render={(props)=>(<Profile {...props} />)} />
      <Route exact path="/orders" render={(props)=>(<Orders {...props} />)} />
      <Route exact path="/test" component={Test} />
    </Switch>
    </>
  );
  }
}

export default App;
