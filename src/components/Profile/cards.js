import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";


class Cards extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cards:[],
            emailId:this.props.email,
        }
    }

    deletecards = (e) =>{
        console.log(e.target.value)
        axios.get(`http://localhost:5000/${this.state.emailId}/card/${e.target.value}/delete`)
        .then((response) =>{
            console.log(response.data)
            this.setState({cards: response.data})
        })
        .catch(err =>{
            console.log("something wrong")
        })
    }

    componentDidMount(){
        console.log(this.state.emailId);
        axios.get(`http://localhost:5000/${this.state.emailId}/cards`)
        .then((response) =>{
            console.log(response);
            this.setState({cards: response.data})
        })
        .catch((err) =>{
            console.log("something wrong")
        })
    }


    render(){
        console.log(this.state.cards)
        return(
           
            <div className="container-fluid m-3" style={{marginLeft:"5rem"}}>
               
                <div className="row">
                    <h2 className="mx-5">Cards Details</h2>
                    {this.state.cards.map((object,index) =>(    
                       <div className="col-sm-3 bg-light px-4 py-5 m-5 border" key={index}>
                            <p>Card Holder: {object.nameOnCard} </p>
                            <p>Card Number: {object.cardNumber} </p>
                            <p>Expiry Date: {`${object.expiryMonth}/${object.expiryYear}`}</p>
                            {/* <Link to={`/${this.state.emailId}/cards/${object.cardsId}/`}><button style={{marginRight:"2vw",marginBottom:"1vh"}}>Modify</button></Link> */}
                            <button style={{marginRight:"2vw",marginBottom:"1vh"}}>Modify</button>
                            <button value={object.cardNumber} onClick={this.deletecards}>Delete</button>
                        </div>
                       
                    ))}
                    <div className="col-sm-3 bg-light p-5 m-5 border">
                        <h4>Add New card</h4>
                        <Link to={`/${this.state.emailId}/card/add`}><button style={{margin:"5vw 10vh",}}>+</button></Link>
                    </div>
                </div>
            </div> 
            

        )
    }
}

export default Cards;