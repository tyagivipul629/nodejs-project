import React from 'react';
import { Redirect } from 'react-router-dom';

class Home extends React.Component{
    logout=()=>{
        fetch('http://localhost:4000/logout',{
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              credentials: 'include'
        }).then(res=>res.json()).then(res=>{
            if(res.status=='success'){
                this.props.unsetUser();
                this.setState({
                    loggedIn: false
                }) 
            }
                
        })
    }
    render(){
        if(!this.props.loggedIn) return <Redirect to="/login" />;
        return(
            <>
            <h1>{this.props.user}</h1>
            <button class="btn btn-success" onClick={this.logout}>Logout</button>
            </>
        );
    }
}

export default Home;