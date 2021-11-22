import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios'
import './signup.css'
import authToken from '../authToken'
import { Redirect } from 'react-router-dom';

class signup extends React.Component{
    constructor(){
        super();
        this.state = {
            userName:"",
            userEmail:'',
            userPhone:"",
            userPassword:'',
            password2:'',
            message:'',
            textStyle:'',
            redirect: false
        }
    }
    
    handlecall=(state)=>{
        console.log("method called")
        var body={userName:this.state.userName,userEmail:this.state.userEmail,userPassword:this.state.userPassword,userPhone:this.state.userPhone}
        axios.post('http://10.85.92.138:8002/signup',body,authToken()).then((res)=>{
            console.log(res);
            if(res.data.status===true){
                console.log('added');
                this.setState({message:"Succesfully Signed Up"})
                setTimeout(()=>this.setState({redirect: true}),1000);
            }else{
               this.setState({message:"User already exist OR Enter details Correctly"})
            }
         
                

        }).catch(()=>{
         console.log('some err in signup of products');
        })
    }



    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value,
        message:''})
    }
    handleSubmit = (e,state) => {
        e.preventDefault();
        const validateEmail = (email) => {
            var re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
            return re.test(email);
        }

        const validatePass=(str)=>{
            console.log(str)
            var upper = 0,
            lower = 0,
            number = 0,
            special = 0;
          for (var i = 0; i < str.length; i++)
          {
            if (str[i] >= "A" && str[i] <= "Z") upper++;
            else if (str[i] >= "a" && str[i] <= "z") lower++;
            else if (str[i] >= "0" && str[i] <= "9") number++;
            else special++;
          }
          console.log(lower,upper,special)
          if(upper>0 && lower>0 && number>0 && special>0){return true}
          else{return false}
        }

        const validateUname=(str)=>{
            var upper = 0,
            lower = 0,
            number = 0,
            special = 0;
            for(var i=0;i<str.length;++i){
                if (str[i] >= "A" && str[i] <= "Z") upper++;
                else if (str[i] >= "a" && str[i] <= "z") lower++;
                else if (str[i] >= "0" && str[i] <= "9") number++;
                else special++;
            }
        
            if(special>0 || number>0) {return false}
            else{return true}
          
        }
        const confirmPass=(pass1,pass2)=>{
            if(pass1!==pass2) return false
            else return true
        }
       
        
        if(this.state.userEmail =='' || this.state.userPassword=='' || this.state.password2=='' || this.state.userName=='' || this.state.userPhone==''){
            this.setState({message:"All fields are mandatory", textStyle:"danger"})
        } 
       else{
           if(validateEmail(this.state.userEmail)){
               if(validatePass(this.state.userPassword)){
                   if(validateUname(this.state.userName)){
                       if(confirmPass(this.state.userPassword,this.state.password2)){
                      this.handlecall(state)
                       
                       }else{
                        this.setState({message:"Passwords are not matching"})
                       }
                     
                   }
                   else{
                    this.setState({message:"Username is not valid(should contain characters only)"})
                   }
                }
                else{
                    this.setState({message:"Password is not valid (Atleast 1 digit,upperCase ,LowerCase && special character needed)"})
                } 
            } else{
                this.setState({message:"Email is not valid(Enter proper email id)"})
            }  
        }
    
}
    render(){
        if(this.state.redirect) return <Redirect to="/login" />;
        
        return(
            <React.Fragment>
                <br/>
               
                <div className="container" >
          
          <div className="row">
                 <div className="col-md-4 offset-4">
                 <div className="card" className="card border-success mb-3"  style={{width: "28rem"}}>
                 <div class="card-header bg-transparent border-success"><center><h5 className="header">Ekart Application</h5></center></div>
                    <div className="card-body" >
    
    <form  style={{position:'relative',left:'50px'}} onSubmit={this.handleSubmit} >
                  <b><h6 className="shaodow"><i>Leverage the benefits of registered users...</i></h6></b><br/>
                    <div className="form-group">
                        <label>Username:</label>
                        <input style={{width:'40%'}} placeholder="First Name" className="form-control" name="userName" type="text" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group ">
                        <label>Email Address:</label>
                        <input className="input-lg" style={{width:'40%'}} placeholder="ex:abc@gmail.com" className="form-control" name="userEmail" type="text" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input style={{width:'40%'}}  placeholder="ex:0123456789"className="form-control" name="userPhone" type="number" onChange={this.handleChange} maxLength="10"/>
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input style={{width:'40%'}}  placeholder="Aa@1"className="form-control" name="userPassword" type="password" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input style={{width:'40%'}}  placeholder="Aa@1"className="form-control" name="password2" type="password" onChange={this.handleChange}/>
                    </div>
                    {this.state.message !== '' && <div className={`text text-${this.state.textStyle}`}>{this.state.message}</div>}<br/>
                    <submit className="btn btn-danger" onClick={this.handleSubmit}>Register</submit>
                </form>
               
                </div>
                             </div>
   
   
                   </div>
   
   
   
            </div>
        </div>
      
  
       
           
              
            </React.Fragment>
        )
    }
}

 export default signup;