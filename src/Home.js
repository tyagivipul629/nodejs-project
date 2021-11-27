import React from 'react';
import { Redirect } from 'react-router-dom';

class Home extends React.Component{
    render(){
        if(!this.props.loggedIn) return <Redirect to="/login" />;
        return(
            <h1>{this.props.user}</h1>
        );
    }
}

export default Home;