import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 

class signup extends React.Component{
    constructor(){
        super();
        this.state = {
            uname:"",
            email:'',
            phone:"",
            password1:'',
            password2:'',
            message:'',
            textStyle:''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value,
        message:''})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const validateEmail = (email) => {
            var re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
            return re.test(email);
        }
        if(this.state.email =='' || this.state.password==''){
            this.setState({message:"All fields are mandatory", textStyle:"danger"})
        } 
        else {
            if(validateEmail(this.state.email)){
                this.setState({message:"Looks good!",
                textStyle:"success"
                })
            }
            else {
                this.setState({message:"Please enter a valid email id",
                textStyle:"danger"
            })
        }
    }  
}
    render(){
        return(
            <React.Fragment>
                <br/>
               
   
    
    <form  style={{position:'relative',left:'50px'}} onSubmit={this.handleSubmit} action="/home">
                  <b><h5>SignUp</h5></b><br/>
                    <div className="form-group">
                        <label>Username:</label>
                        <input style={{width:'40%'}} placeholder="Enter your username" className="form-control" name="uname" type="text" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Email Address:</label>
                        <input style={{width:'40%'}} placeholder="Enter your email" className="form-control" name="email" type="text" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input style={{width:'40%'}}  placeholder="Enter your phone-number"className="form-control" name="phone" type="number" onChange={this.handleChange} maxLength="10"/>
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input style={{width:'40%'}}  placeholder="Enter the password"className="form-control" name="password1" type="password" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input style={{width:'40%'}}  placeholder="Eonfirm the password"className="form-control" name="password2" type="password" onChange={this.handleChange}/>
                    </div>
                    {this.state.message !== '' && <div className={`text text-${this.state.textStyle}`}>{this.state.message}</div>}<br/>
                    <submit className="btn btn-primary" onClick={this.handleSubmit}>Register</submit>
                </form>
               
    
  
       
           
              
            </React.Fragment>
        )
    }
}

 export default signup;