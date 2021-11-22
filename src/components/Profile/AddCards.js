import axios from "axios";
import React from "react";
import authToken from "../authToken";
// import { Link } from "react-router-dom";

const userId = localStorage.getItem('userId')
class AddCards extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            emailId:this.props.match.params.email,
            cardNumber: "",
            nameOnTheCard:"",
            expiryDate:"",
            expiryMonth:"",
            expiryYear:"",
            cardNumberMsg:"",
            nameOnTheCardMsg:"",
            expiryDateMsg:"",
            submitMsg:"",
            msgColor:false,
        }
    }

    changeState = (e) =>{
        if(e.target.name === "expiryDate"){
            let [year,month] = e.target.value.split("-")
            console.log(e.target.value,year,month)
            this.setState({expiryDate:e.target.value,expiryYear:year,expiryMonth:month})
            this.setState({[e.target.name+"Msg"]:""})
        }else{
        this.setState({[e.target.name]:e.target.value})
        this.setState({[e.target.name+"Msg"]:""})
        }
    }

    luhnCheck =(cardNo) =>{
        var numSum = 0;
        var value;
        for (var i = 0; i < 16; ++i) {
            if (i % 2 === 0) {
                value = 2 * cardNo[i];
                if (value >= 10) {
                    value = (Math.floor(value / 10) + value % 10);
                }
            } else {
                value = +cardNo[i];
            }
            numSum += value;
        }
        return (numSum % 10 === 0);
    }

    expiryCheck =(month,year) =>{
        var today, someday;
        today = new Date();
        someday = new Date();
        someday.setFullYear(year, month, 1);

        if (someday < today) {
            // console.log("The expiry date is before today's date. Please select a valid expiry date");
            return false;
        }else{
            // console.log("Valid Date")
            return true
        }
    }


    submitForm = (e) =>{
        e.preventDefault()
        if(this.state.cardNumber.length === 16 && this.luhnCheck(this.state.cardNumber)){
            // console.log("Valid No.")
            if(this.state.nameOnTheCard){
                // console.log("Correct name")
                if(this.state.expiryDate && this.expiryCheck(this.state.expiryMonth,this.state.expiryYear)){
                    // console.log("Valid Date");
                    var body={cardNumber:this.state.cardNumber,nameOnTheCard:this.state.nameOnTheCard,expiryMonth:this.state.expiryMonth,expiryYear:this.state.expiryYear}
                    console.log(body)
                            axios.post(`http://10.85.92.138:8002/${userId}/card/add`,body,authToken())
		                    .then((response) =>{ 
                                this.setState({submitMsg:"Changes Saved",msgColor:true})   
                            }).catch(() =>{
                                this.setState({name: "",address:"",mobileNo:"" ,emailId:"",password:"",submitMsg:"Registration Failed",})
                            })
                }else{
                    // console.log("Enter Valid Date")
                    this.setState({expiryDateMsg:"*Enter Valid Expiry Date"})
                }
            }else{
                // console.log("Enter Holder name")
                this.setState({nameOnCardMsg:"*Enter Card Holder Name"})
            }
        }else{
            // console.log("Not Valid No.")
            this.setState({cardNumberMsg:"*CardNo is not Valid"})
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
        console.log(this.state.expiryDate,this.state.expiryYear,this.state.expiryMonth)
        let color = this.state.msgColor ? "green" : "red"
        return(
            <>
            <center>
            <div className="container" style={{marginLeft:"5rem"}}>
            <h2>Add New Card</h2>
            <table>
                <tbody>
                <tr>
                    <td>
                        <form style={{width:"20rem"}}>
                            <div>
                                 <label htmlFor="cardNumber">Card Number:</label>
                                 <input type="text" id="nameOnCard" name="cardNumber" value={this.state.cardNumber} onChangeCapture={this.changeState} style={{float:"right"}}/>
                                 <p className="message" style={{color:color,marginTop:"1rem"}}>{this.state.cardNumberMsg}</p>
                             </div>
                             <div>
                                 <label htmlFor="nameOnCard">Card Holder:</label>
                                 <input type="text" id="nameOnCard" name="nameOnTheCard" value={this.state.nameOnTheCard} onChange={this.changeState} style={{float:"right"}}/>
                                 <p className="message" style={{color:color,marginTop:"1rem"}}>{this.state.nameOnTheCardMsg}</p>
                             </div>
                             <div style={{marginBottom:"1rem"}}>
                                 <label htmlFor="expiryDate">Expiry Date:</label>
                                 <input type="month" id="expiryDate" name="expiryDate" value={this.state.expiryDate} onChangeCapture={this.changeState} style={{float:"right"}}/>
                                 <p className="message" style={{color:color,marginTop:"1rem"}}>{this.state.expiryDateMsg}</p>
                             </div>
                             {/* <div style={{marginBottom:"1rem"}}>
                                 <label htmlFor="expiryYear">Expiry Year:</label>
                                 <input type="year" id="expiryYear" name="expiryYear" value={this.state.expiryYear} onChangeCapture={this.changeState} style={{float:"right"}}/>
                                 <p className="message" style={{color:color,marginTop:"1rem"}}>{this.state.expiryYearMsg}</p>
                             </div> */}
                             <div className="buttons">
                             <button className="submit" onClick={this.submitForm} style={{marginLeft:"2rem"}}>Add a Card</button>
                             {/* <button className="cancel" onClick={this.resetState} style={{marginLeft:"2rem"}}>Cancel</button> */}
                             <p className="register" style={{color:color}}>{this.state.submitMsg}</p>
                            </div>
                        </form>
                        
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
            </center>
        </>
        )
    }
}

export default AddCards;