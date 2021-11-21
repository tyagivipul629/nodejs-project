import axios from "axios";
import React from "react";
// import { Link } from "react-router-dom";


class ModifyAddress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            emailId:this.props.match.params.email,
            addressId:this.props.match.params.addressId,
            address: "",
            city:"",
            state:"",
            pinCode:null,
            phoneNumber:null,
            addressMsg:"",
            cityMsg:"",
            stateMsg:"",
            pinCodeMsg:"",
            phoneNumberMsg:"",
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
        axios.get(`http://localhost:5000/${this.state.emailId}/address/${this.state.addressId}`)
        .then((response) =>{
            this.setState({address: response.data.address, city:response.data.city, state: response.data.state, pinCode: response.data.pinCode,phoneNumber:response.data.phoneNumber})
        }).catch( error =>{
            console.log("in catch");
        })
    }

    submitForm = (e) =>{
        console.log("in submit form")
        e.preventDefault()
        if(/[@_!#$%^&*()<>?|}{~:]/.test(this.state.city) === false){
            console.log("yes");
            if(this.state.pinCode.length === 6){
                console.log("pass");
                //condition for State
                if(this.state.phoneNumber.length === 10){
                            var body={addressId:this.state.addressId,address:this.state.address,state:this.state.state,city:this.state.city,pinCode:this.state.pinCode,phoneNumber:this.state.phoneNumber}
                            axios.post(`http://localhost:5000/${this.state.emailId}/address/${this.state.addressId}/modify`,body)
		                    .then((response) =>{ 
                                this.setState({submitMsg:"Changes Saved",msgColor:true})   
                            }).catch(() =>{
                                this.setState({name: "",address:"",mobileNo:"" ,emailId:"",password:"",submitMsg:"Registration Failed",})
                            })
                }else{
                    this.setState({phoneNumberMsg:"*Phone No must be of 10 digit"})
                    }
            }else{
                    this.setState({passwordMsg:"*PinCode must be of 6 digit"})
                }
        }else{
            this.setState({nameMsg:"*City does not contain any special character"})
        }
        
    }

    componentDidMount(){
        console.log(this.state.emailId);
        axios.get(`http://localhost:5000/${this.state.emailId}/address/${this.state.addressId}`)
        .then((response) =>{
            console.log(response);
            this.setState({address: response.data.address, city:response.data.city, state: response.data.state, pinCode: response.data.pinCode,phoneNumber:response.data.phoneNumber})
        })
        .catch((err) =>{
            console.log("something wrong")
        })
    }


    render(){
        console.log( /[@_!#$%^&*()<>?|}{~:]/.test(this.state.city))
        let color = this.state.msgColor ? "green" : "red"
        return(
            <>
            <div className="container" style={{marginLeft:"5rem"}}>
            <h2>Modify Address</h2>
            <table>
                <tbody>
                <tr>
                    <td>
                        <form style={{width:"20rem"}}>
                            <div>
                                 <label htmlFor="address">Address:</label>
                                 <input type="text" id="user" name="address" value={this.state.address} onChangeCapture={this.changeState} style={{float:"right"}}/>
                                 <p className="message" style={{color:color}}>{this.state.addressMsg}</p>
                             </div>
                             <div>
                                 <label htmlFor="city">City:</label>
                                 <input type="text" id="city" name="city" value={this.state.city} onChange={this.changeState} style={{float:"right"}}/>
                                 <p className="message" style={{color:color}}>{this.state.cityMsg}</p>
                             </div>
                             <div style={{marginBottom:"1rem"}}>
                                 <label htmlFor="state">State:</label>
                                 <input type="text" id="state" name="state" value={this.state.state} onChangeCapture={this.changeState} style={{float:"right"}}/>
                                 {/* <p className="message">{this.state.emailIdMsg}</p> */}
                             </div>
                             <div style={{marginBottom:"1rem"}}>
                                 <label htmlFor="pinCode">PinCode:</label>
                                 <input type="number" id="pinCode" name="pinCode" value={this.state.pinCode} onChangeCapture={this.changeState} style={{float:"right"}}/>
                                 {/* <p className="message">{this.state.emailIdMsg}</p> */}
                             </div>
                             <div style={{marginBottom:"1rem"}}>
                                 <label htmlFor="phoneNumber">Mobile No:</label>
                                 <input type="number" id="phoneNumber" name="phoneNumber" value={this.state.phoneNumber} onChange={this.changeState} style={{float:"right"}}/>
                                 <p className="message" style={{color:color}}>{this.state.phoneNumberMsg}</p>
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
        </>
        )
    }
}

export default ModifyAddress;