import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios'

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
    
    handlecall=(state)=>{
        console.log("method called")
        console.log(state);
        axios.post('http://localhost:5000/signup',state).then((res)=>{
            console.log('added');
                

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
        function success(){
            setTimeout(function(){
             console.log("signup")
            },5000)
        }
        
        if(this.state.email =='' || this.state.password1=='' || this.state.password2=='' || this.state.uname=='' || this.state.phone==''){
            this.setState({message:"All fields are mandatory", textStyle:"danger"})
        } 
       else{
           if(validateEmail(this.state.email)){
               if(validatePass(this.state.password1)){
                   if(validateUname(this.state.uname)){
                       if(confirmPass(this.state.password1,this.state.password2)){
                        this.setState({message:"Succesfully Signed Up"})
                          success()
                          this.props.history.replace('/home');
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
        return(
            <React.Fragment>
                <br/>
               
   
    
    <form  style={{position:'relative',left:'50px'}} onSubmit={this.handleSubmit} onClick={()=>{this.handlecall(this.state)}}>
                  <b><h5>SignUp</h5></b><br/>
                    <div className="form-group">
                        <label>Username:</label>
                        <input style={{width:'40%'}} placeholder="Only Characters Allowed(First Name)" className="form-control" name="uname" type="text" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Email Address:</label>
                        <input style={{width:'40%'}} placeholder="ex:abc@gmail.com" className="form-control" name="email" type="text" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input style={{width:'40%'}}  placeholder="ex:0123456789"className="form-control" name="phone" type="number" onChange={this.handleChange} maxLength="10"/>
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input style={{width:'40%'}}  placeholder="Aa@1"className="form-control" name="password1" type="password" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input style={{width:'40%'}}  placeholder="Aa@1"className="form-control" name="password2" type="password" onChange={this.handleChange}/>
                    </div>
                    {this.state.message !== '' && <div className={`text text-${this.state.textStyle}`}>{this.state.message}</div>}<br/>
                    <submit className="btn btn-success" onClick={this.handleSubmit}>Register</submit>
                </form>
               
    
  
       
           
              
            </React.Fragment>
        )
    }
}

 export default signup;