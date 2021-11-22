import axios from "axios";
import React from "react";
// import { Link } from "react-router-dom";

const userId = localStorage.getItem('userId')
class AddAddress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           // emailId:this.props.match.params.email,
            emailId:"",
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


    submitForm = (e) =>{
        console.log("in submit form")
        e.preventDefault()
        if(this.state.address){
        if( this.state.city && /[@_!#$%^&*()<>?|}{~:]/.test(this.state.city) === false){
            console.log("yes");
            if(this.state.pinCode && this.state.pinCode.length === 6){
                console.log("pass");
                //condition for State
                if(this.state.phoneNumber && this.state.phoneNumber.length === 10){
                            var body={address:this.state.address,state:this.state.state,city:this.state.city,pinCode:this.state.pinCode,phoneNumber:this.state.phoneNumber}
                            axios.post(`http://10.85.92.138:8002/${userId}/address/add`,body)
		                    .then((response) =>{ 
                                this.setState({submitMsg:"Changes Saved",msgColor:true})   
                            }).catch(() =>{
                                this.setState({name: "",address:"",mobileNo:"" ,emailId:"",password:"",submitMsg:"Registration Failed",})
                            })
                }else{
                    this.setState({phoneNumberMsg:"*Phone No must be of 10 digit"})
                    }
            }else{
                    this.setState({pinCodeMsg:"*PinCode must be of 6 digit"})
                }
        }else{
            this.setState({cityMsg:"*City does not contain any special character"})
        }
    }else{
        this.setState({addressMsg:"*Address is not Filled yet"})
    }
        
    }

    // componentDidMount(){
    //     console.log(this.state.emailId);
    //     axios.get(`http://localhost:5000/${this.state.emailId}/address/${this.state.addressId}`)
    //     .then((response) =>{
    //         console.log(response);
    //         this.setState({address: response.data.address, city:response.data.city, state: response.data.state, pinCode: response.data.pinCode,phoneNumber:response.data.phoneNumber})
    //     })
    //     .catch((err) =>{
    //         console.log("something wrong")
    //     })
    // }


    render(){
        console.log( /[@_!#$%^&*()<>?|}{~:]/.test(this.state.city))
        let color = this.state.msgColor ? "green" : "red"
        return(
            <>
            <div className="container" style={{marginLeft:"5rem"}}>
            <h2>Add New Address</h2>
            <table>
                <tbody>
                <tr>
                    <td>
                        <form style={{width:"20rem"}}>
                            <div>
                                 <label htmlFor="address">Address:</label>
                                 <input type="text" id="user" name="address" value={this.state.address} onChangeCapture={this.changeState} style={{float:"right"}}/>
                                 <p className="message" style={{color:color,marginTop:"1rem"}}>{this.state.addressMsg}</p>
                             </div>
                             <div>
                                 <label htmlFor="city">City:</label>
                                 <input type="text" id="city" name="city" value={this.state.city} onChange={this.changeState} style={{float:"right"}}/>
                                 <p className="message" style={{color:color,marginTop:"1rem"}}>{this.state.cityMsg}</p>
                             </div>
                             <div style={{marginBottom:"1rem"}}>
                                 <label htmlFor="state">State:</label>
                                 <input type="text" id="state" name="state" value={this.state.state} onChangeCapture={this.changeState} style={{float:"right"}}/>
                                 <p className="message" style={{color:color,marginTop:"1rem"}}>{this.state.stateMsg}</p>
                             </div>
                             <div style={{marginBottom:"1rem"}}>
                                 <label htmlFor="pinCode">PinCode:</label>
                                 <input type="number" id="pinCode" name="pinCode" value={this.state.pinCode} onChangeCapture={this.changeState} style={{float:"right"}}/>
                                 <p className="message" style={{color:color,marginTop:"1rem"}}>{this.state.pinCodeMsg}</p>
                             </div>
                             <div style={{marginBottom:"1rem"}}>
                                 <label htmlFor="phoneNumber">Mobile No:</label>
                                 <input type="number" id="phoneNumber" name="phoneNumber" value={this.state.phoneNumber} onChange={this.changeState} style={{float:"right"}}/>
                                 <p className="message" style={{color:color,marginTop:"1rem"}}>{this.state.phoneNumberMsg}</p>
                             </div>
                             <div className="buttons">
                             <button className="submit" onClick={this.submitForm} style={{marginLeft:"2rem"}}>Add a Address</button>
                             {/* <button className="cancel" onClick={this.resetState} style={{marginLeft:"2rem"}}>Cancel</button> */}
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

export default AddAddress;