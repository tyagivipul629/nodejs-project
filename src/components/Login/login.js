/*import React from 'react';
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

export default Login; */
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: "",
            Password: "",
        }
    }

    changeField = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            message: ''
        })
    }


    LoginUser = (e) => {
        e.preventDefault();
         if(this.state.Email!='' && this.state.Password!='')
        {
            axios.get('./login.json').then(res=>{ 
                 const temp=res.data.filter(elem=>elem.Email==this.state.Email&&elem.Password==this.state.Password);
                if(temp.length==1)
                {
                    localStorage.setItem('username',this.state.Email);
                    this.props.history.replace('/home');
                    //this.props.LoginUser(this.state.Email);
                }
                else{
                    alert("Either your Email or Password is incorrect");
                } })
                 
         }
         else{
             alert("Both feild are mandatory")
         }



        
    }


    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.UserLogin} class="alpha">
                <b style={{"background-color":"green"}}><h2 class="user" ><i > WELCOME TO EKART &reg;</i></h2></b><br/>
                    <div class="login-box" style={{ height: '300px', marginTop: '-60px' }}>
                        <p class="login">USERNAME</p>
                        <input type="text" name="Email" id="login1" placeholder="Enter : Email" value={this.state.Email} onChange={(e) => this.changeField(e)} required />
                        <p class="login"> PASSWORD</p>
                        <input type="password" name="Password" id="login1" placeholder="Enter : Password" value={this.state.Password} onChange={(e) => this.changeField(e)} required />
                        
                        <input type="submit" name="submit" value="login" class="login" onClick={this.LoginUser} />
                        <span>
                            <p><Link to='/signup'>Sign Up ?</Link>If you don't have Account</p>
                        </span>
                    </div>
                </form>

            </React.Fragment>
        )
    }
}

export default login;