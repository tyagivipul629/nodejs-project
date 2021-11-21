import axios from "axios";
import React from "react";
import Address from "./address";
import Cards from "./cards";
// import { Link } from "react-router-dom";


class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            password:"",
            emailId:this.props.match.params.email,
            mobileNo:null,
            nameMsg:"",
            passwordMsg:"",
            mobileNoMsg:"",
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
        axios.get(`http://localhost:5000/user/${this.state.emailId}`)
        .then((response) =>{
            this.setState({name: response.data.name, password: response.data.password, mobileNo:response.data.mobileNo, nameMsg:"", passwordMsg:"", mobileNoMsg:"", submitMsg:""})
        }).catch( error =>{
            console.log("in catch");
        })
    }

    submitForm = (e) =>{
        e.preventDefault()
        if(/^[a-zA-Z]+[a-zA-Z]+$/.test(this.state.name)){
            console.log("yes");
            if(/[a-z]+/.test(this.state.password) && /[A-Z]+/.test(this.state.password) && /[0-9]+/.test(this.state.password) && /[*@!#%&()^~{}]+/.test(this.state.password)){
                console.log("pass");
                if(this.state.mobileNo.length === 10){
                            var body={name:this.state.name,mobileNo:this.state.mobileNo,emailId:this.state.emailId,password:this.state.password}
                            axios.post(`http://localhost:5000/${this.state.emailId}/update`,body)
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
        console.log(this.state.emailId);
        axios.get(`http://localhost:5000/user/${this.state.emailId}`)
        .then((response) =>{
            console.log(response);
            this.setState({name: response.data.name, emailId:response.data.emailId, password: response.data.password, mobileNo: response.data.mobileNo})
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
                                 <input type="text" id="user" name="name" value={this.state.name} onChangeCapture={this.changeState} style={{float:"right"}}/>
                                 <p className="message" style={{color:color,marginTop:"1rem"}}>{this.state.nameMsg}</p>
                             </div>
                             <div>
                                 <label htmlFor="password">Password:</label>
                                 <input type="password" id="password" name="password" value={this.state.password} onChange={this.changeState} style={{float:"right"}}/>
                                 <p className="message" style={{color:color,marginTop:"1rem"}}>{this.state.passwordMsg}</p>
                             </div>
                             <div style={{marginBottom:"1rem"}}>
                                 <label htmlFor="email">Email Id:</label>
                                 <input type="email" id="email" name="emailId" value={this.state.emailId} disabled readOnly style={{float:"right"}}/>
                                 {/* <p className="message">{this.state.emailIdMsg}</p> */}
                             </div>
                             <div style={{marginBottom:"1rem"}}>
                                 <label htmlFor="mobile">Mobile No:</label>
                                 <input type="number" id="mobile" name="mobileNo" value={this.state.mobileNo} onChange={this.changeState} style={{float:"right"}}/>
                                 <p className="message" style={{color:color,marginTop:"1rem"}}>{this.state.mobileNoMsg}</p>
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
        <Address email={this.state.emailId}></Address>
        <Cards email={this.state.emailId}></Cards>
        </>
        )
    }
}

export default Profile;