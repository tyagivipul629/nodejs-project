import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import authToken from '../authToken';
import axios from 'axios';

const url="";

class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: "",
            Password: "",
            message: "",
            redirect: false
        }
    }

    changeField = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            message: ''
        })
    }


    loginUser = (e) => {
        e.preventDefault();
         if(this.state.Email!='' && this.state.Password!='')
        {
            /*axios.get('login.json').then(res=>{
                //console.log(res.data);
            })*/
            axios.post(url+'/login',
            {userEmail: this.state.Email, userPassword: this.state.Password},authToken())
            .then(res=>{
                if(res.data.status=="true"){
                    localStorage.setItem('user',this.state.email);
                    localStorage.setItem('userid',res.data.userid);
                    localStorage.setItem('token',res.data.token);
                    this.props.setUser(this.state.email,res.data.userid);
                    this.setState({
                        redirect: true
                    })
                }
                else{
                    alert("Wrong Username/Password!!");
                }
            })
        }
         else{
             alert("Both fields are mandatory")
         }
        
    }


    render() {
        if(this.state.redirect) return <Redirect to="/" />;
        return (
            <React.Fragment>
                <div style={{width: '300px', margin: '70px auto', padding: '20px', border: '2px solid black', backgroundColor: 'rgba(0,0,0,0.4)'}}>
                    <div className="mb-3" style={{display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center'}}>
                        <img src={'/assets/images/user.jpg'} style={{height: '100px', width: '100px', borderRadius: '50%'}} />
                        <h3>Login Here</h3>
                    </div>
                    <div className="mb-3">
                        <label for="inputEmail" className="form-label" style={{fontWeight: '600'}}>Email</label>
                        <input type="email" className="form-control" name="Email"
                        placeholder="Enter Email"
                        onChange={this.changeField}
                        value={this.state.Email} id="inputEmail" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">Don't Worry! Your email would be safe.</div>
                    </div>
                    <div className="mb-3">
                        <label for="inputPass" className="form-label" style={{fontWeight: '600'}}>Password</label>
                        <input type="password" className="form-control" name="Password"
                        placeholder="Enter Password"
                        onChange={this.changeField}
                        value={this.state.Password} id="inputPass" />
                    </div>
                    <div className="mb-3" style={{display: 'flex', justifyContent: 'center'}}><button className="btn btn-primary" onClick={this.loginUser}>Login</button></div>
                    <Link to="/signup" style={{textDecoration: 'none'}}>Register Here!</Link>
                </div>
            </React.Fragment>
        )
    }
}

export default login;







