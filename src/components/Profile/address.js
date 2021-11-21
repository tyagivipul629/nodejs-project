import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";


class Address extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address:[],
            emailId:this.props.email,
        }
    }

    deleteAddress = (e) =>{
        console.log(e.target.value)
        axios.get(`http://localhost:5000/${this.state.emailId}/address/${e.target.value}/delete`)
        .then((response) =>{
            console.log(response.data)
            this.setState({address: response.data})
        })
        .catch(err =>{
            console.log("something wrong")
        })
    }

    componentDidMount(){
        console.log(this.state.emailId);
        axios.get(`http://localhost:5000/${this.state.emailId}/address`)
        .then((response) =>{
            console.log(response);
            this.setState({address: response.data})
        })
        .catch((err) =>{
            console.log("something wrong")
        })
    }


    render(){
        console.log(this.state.address)
        return(
            <div className="container-fluid m-3" style={{marginLeft:"5rem"}}>
                <div className="row">
                    <h2 className="mx-5">Address Details</h2>
                    {this.state.address.map((object,index) =>(    
                        <div className="col-sm-3 bg-light p-5 m-5 border" key={index}>
                            <p>Address: {object.address} </p>
                            <p>City: {object.city} </p>
                            <p>State: {object.state} </p>
                            <p>Zip Code: {object.pinCode} </p>
                            <p>PhoneNo: {object.phoneNumber}</p>
                            <Link to={`/${this.state.emailId}/address/${object.addressId}/`}><button style={{marginRight:"2vw",marginBottom:"1vh"}}>Modify</button></Link>
                            <button value={object.addressId} onClick={this.deleteAddress}>Delete</button>
                        </div>
                    ))}
                    <div className="col-sm-3 bg-light p-5 m-5 border">
                        <h4>Add New Address</h4>
                        <Link to={`/${this.state.emailId}/address/add`}><button style={{margin:"5vw 10vh",}}>+</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Address;