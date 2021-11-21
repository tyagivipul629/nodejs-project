import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            redirect: false
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            localStorage.setItem('user','vipul');
            localStorage.setItem('userid','1234');
            this.props.setUser('vipul','1234');
            this.setState({
                redirect: true
            })
        },6000);
    }
    render(){
        if(this.state.redirect) return <Redirect to="/" />
        return(
            <h1>Login</h1>
        );
    }
}

export default Login;