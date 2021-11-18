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

class App extends React.Component {
  render(){
    return (
      <>
      
    <Switch>
      <Route exact path="/" render={(props)=>(<Home {...props} />)} />
      <Route exact path="/login" render={(props)=>(<Login {...props} />)} />
      <Route exact path="/signup" render={(props)=>(<Signup {...props} />)} />
      <Route exact path="/description/:id" render={(props)=>(<Description {...props} />)} />
      <Route exact path="/cart" render={(props)=>(<Cart {...props} />)} />
      <Route exact path="/notification" render={(props)=>(<Notification {...props} />)} />
      <Route exact path="/wishlist" render={(props)=>(<WishList {...props} />)} />
      <Route exact path="/profile" render={(props)=>(<Profile {...props} />)} />
    </Switch>
    </>
  );
  }
}

export default App;
