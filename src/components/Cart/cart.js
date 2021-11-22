import React, {useState, useEffect} from "react";
import "./cart.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Items from "./Items";
import axios from "axios";
import authToken from "../authToken"

const Cart = () => {
    var userid = localStorage.getItem("userid");
    
    //var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbWVlckBnbWFpbC5jb20iLCJpYXQiOjE2Mzc1MDIxMTR9.3-TdCZybCc4KAEHOqNETQ_nv-xGilADEGiL000Ftroc";
    
    const [user,setuser] = useState([]);

    
    useEffect(() => {
        async function fetchData(){
            try{
                if(localStorage.getItem('token')!=null)
                {const response = await axios.get(`http://10.85.92.138:8002/${userid}/cart`,authToken());
                setuser(response.data.data);}
                else{
                    const items=JSON.parse(localStorage.getItem('items'));
                    
                    if(items!=null&items.length!=0){
                        setuser(items);
                    }
                    
                }
            }
            catch(error){
                console.log(error);
            }
        }
        fetchData();
    },[]);


return (
    <div className="m-3">
     
        <h1 className="m-3">Shipping Cart</h1>
        
        {/* Heaader Row */}
        <div className="container">
            <div className="row">
                <div className="col"></div>

                <div className="col"></div>

                <div className="col">
                    <div className="category text-center mt-5">
                        <h4>Category</h4>
                    </div>
                </div>

                <div className="col">
                    <div className="text-center mt-5">
                        <h4>Quantity</h4>
                    </div>
                </div>

                <div className="col">
                    <div className="text-center price mt-5">
                        <h4>Price</h4>
                    </div>
                </div>

                <div className="col"></div>

            </div>
        </div>

        {/* products row */}
        <div className="mt-5 px-5">
            <hr/>
        </div>

        <div className="cart-items-container">
            {

                // user.quantity
                user.length!=0?
                user.map((curItem) => {
                    return <Items key ={curItem.displayName} {...curItem} />;
                }):<h3>No Item available in cart right now</h3>
            }
        </div>

        {/* end products */}

        <div className="px-5 m-5">
            <div className="d-flex flex-row-reverse">
                <h4>Total Amount: 22000$</h4>
            </div>

            <div className="d-flex flex-row-reverse">
                <button type="button" className="btn btn-success">
                    Checkout
                </button>
            </div>
        </div>
    </div>
);
}

export default Cart;