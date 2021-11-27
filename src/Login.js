import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loggedIn: false
        }
    }
    login=()=>{
        fetch('http://localhost:4000/login',{
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              credentials: 'include'
        }).then(res=>res.json()).then(res=>{
            if(res.status=='success'){
                this.props.setUser(res.user);
                this.setState({
                    loggedIn: true
                })
                
            }
                
        })
    }
    
    render(){
        if(this.props.loggedIn||this.state.loggedIn) return <Redirect to="/" />;
        return(
            <button class="btn btn-success" onClick={this.login}>Login</button>
        );
    }
}

export default Login;