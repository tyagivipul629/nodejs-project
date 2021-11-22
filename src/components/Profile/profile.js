import axios from "axios";
import React from "react";
import Address from "./address";
import Cards from "./cards";
// import { Link } from "react-router-dom";

const userId = localStorage.getItem('userId')
class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            userPassword:"",
            //userId:this.props.match.params.userId,
            userEmail:"",
            userPhone:null,
            userNameMsg:"",
            userPasswordMsg:"",
            userPhoneMsg:"",
            submitMsg:"",
            msgColor:false,
        }
    }

    changeState = (e) =>{
        this.setState({[e.target.name]:e.target.value})
        this.setState({[e.target.name+"Msg"]:""})
    }

    resetState = (e) =>{
        e.preventDefault()
        console.log("reset");
        axios.get(`http://10.85.92.138:8002/user/${userId}`)
        .then((response) =>{
            this.setState({name: response.data.name, password: response.data.password, mobileNo:response.data.mobileNo, nameMsg:"", passwordMsg:"", mobileNoMsg:"", submitMsg:""})
        }).catch( error =>{
            console.log("in catch");
        })
    }

    submitForm = (e) =>{
        e.preventDefault()
        if(/^[a-zA-Z]+[a-zA-Z]+$/.test(this.state.userName)){
            console.log("yes");
            if(/[a-z]+/.test(this.state.userPassword) && /[A-Z]+/.test(this.state.userPassword) && /[0-9]+/.test(this.state.userPassword) && /[*@!#%&()^~{}]+/.test(this.state.userPassword)){
                console.log("pass");
                if(this.state.userPhone.length === 10){
                            var body={userName:this.state.userName,userPhone:this.state.userPhone,userEmail:this.state.userEmail,userPassword:this.state.userPassword}
                            axios.post(`http://10.85.92.138:8002/${userId}/updateprofile`,body)
		                    .then((response) =>{ 
                                this.setState({submitMsg:"Changes Saved",msgColor:true})   
                            }).catch(() =>{
                                this.setState({name: "",address:"",mobileNo:"" ,emailId:"",password:"",submitMsg:"Registration Failed",})
                            })
                }else{
                    this.setState({mobileNoMsg:"*Mobile No must be of 10 digit"})
                    }
            }else{
                    this.setState({passwordMsg:"*Password criteria doesn't match"})
                }
        }else{
            this.setState({nameMsg:"*Fill the correct Name"})
        }
        
    }

    componentDidMount(){
        console.log(this.state.userEmail);
        axios.get(`http://10.85.92.138:8002/user/${this.state.userEmail}`)
        .then((response) =>{
            console.log(response);
            this.setState({userName: response.data.userName, userEmail:response.data.userEmail, userPassword: response.data.userPassword, userPhone: response.data.userPhone})
        })
        .catch((err) =>{
            console.log("something wrong")
        })
    }


    render(){
        console.log(this.props.match.params.email)
        let color = this.state.msgColor ? "green" : "red"
        return(
            <>
            <div className="container" style={{marginLeft:"4rem"}}>
            <h2>User Details</h2>
            <table>
                <tbody>
                <tr>
                    <td>
                        <form  style={{width:"20rem"}}>
                            <div>
                                 <label htmlFor="user">Name:</label>
                                 <input type="text" id="user" name="name" value={this.state.userName} onChangeCapture={this.changeState} style={{float:"right"}}/>
                                 <p className="message" style={{color:color,marginTop:"1rem"}}>{this.state.userNameMsg}</p>
                             </div>
                             <div>
                                 <label htmlFor="password">Password:</label>
                                 <input type="password" id="password" name="password" value={this.state.userPassword} onChange={this.changeState} style={{float:"right"}}/>
                                 <p className="message" style={{color:color,marginTop:"1rem"}}>{this.state.userPasswordMsg}</p>
                             </div>
                             <div style={{marginBottom:"1rem"}}>
                                 <label htmlFor="email">Email Id:</label>
                                 <input type="email" id="email" name="emailId" value={this.state.userEmail} style={{float:"right"}}/>
                                 {/* <p className="message">{this.state.emailIdMsg}</p> */}
                             </div>
                             <div style={{marginBottom:"1rem"}}>
                                 <label htmlFor="mobile">Mobile No:</label>
                                 <input type="number" id="mobile" name="mobileNo" value={this.state.userPhone} onChange={this.changeState} style={{float:"right"}}/>
                                 <p className="message" style={{color:color,marginTop:"1rem"}}>{this.state.userPhoneMsg}</p>
                             </div>
                             <div className="buttons">
                             <button className="submit" onClick={this.submitForm} style={{marginLeft:"2rem"}}>Save Changes</button>
                             <button className="cancel" onClick={this.resetState} style={{marginLeft:"2rem"}}>Cancel</button>
                             <p className="register" style={{color:color}}>{this.state.submitMsg}</p>
                            </div>
                        </form>
                        
                    </td>
                </tr>
                </tbody>
            </table>

            </div>
        <Address email={this.state.userEmail}></Address>
        <Cards email={this.state.userEmail}></Cards>
        </>
        )
    }
}

export default Profile;