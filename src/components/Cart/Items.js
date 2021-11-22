import React, { useState,useEffect } from "react";
import axios from "axios";

const Items = (props) => {


    console.log(props.price);
    // const myFun = () => {
    //     var amt = (props.price)*quant;
    //     alert(amt);
    // }

    var p=props.productName;
    var s = props.sellerName;
    var q= props.quantity;
    var c = props.category;
    console.log(p + s + q + c);
    let data = props._id;
    console.log(props._id);
    var userid = localStorage.getItem("userid");
    var token = localStorage.getItem("token");
    const [user,setuser] = useState([]);

            async function removeItem(){        
            try{
                const response = await axios.post(`http://10.85.92.138:8002/${userid}/modifycart`,{
                    "props.productName":p,
                    "props.sellerName":s,
                    "props.quantity":q,
                    "props.category":c

                },{
                    headers:{
                        Authorization : "Bearer " + (token)
                    }
                })
                setuser(response);
                setQuant(0);
            }catch(error){
                console.log(error);
            }
        }


    const [quant,setQuant] = useState(props.quantity); 

    const plus = () => {
        setQuant(quant+1);
    }
    const minus = () => {
        if(quant!=0){
        setQuant(quant-1);
        }

    }

    return(
        <div className="container mx-6">
            <div className="row">
                <div className="col">
                    <img src={'/assets/images/iphone.jpg'} alt="img" width="100px" height="100px"/>
                </div>

                <div className="col">
                    <div className="title text-center mt-4">
                        <h4>{props.productName}</h4>
                    </div>
                </div>

                <div className="col">
                    <div className="props.category text-center mt-4">
                        <p className="display-7">{props.category}</p>
                    </div>
                </div>

                <div className="col">
                    <div className="add-minus-props.quantity text-center mt-4">
                        <i className="fas fa-minus" onClick={ ()=>{
                            minus()
                        }}>-</i>
                        <div className="">
                            <input type="number" placeholder="1" className="text-center ip" value={quant} min="0"/>
                        </div > 
                        <div>
                        <i className="fas fa-plus" onClick={ ()=>{
                            plus()
                        }}>+</i>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="props.price text-center props.price mt-4">
                        <p className="display-7">{props.price*quant}</p>
                    </div>
                </div>

                <div className="col">
                    <div className="remove-item text-center mt-4">
                        <button type="button" className="btn btn-danger" onClick={ ()=> props.alert(data)}>
                            Remove Item
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Items;
