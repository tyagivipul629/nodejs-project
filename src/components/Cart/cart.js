import React, {useState, useEffect} from "react";
import "./cart.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Items from "./Items";
import axios from "axios";
import authToken from "../authToken"

const Cart = () => {

    function myCart(data){

        // alert(data);
        
        let userTo = user.filter((element,index) => {
            return ((element._id) !== data);
        })
        setuser(userTo);
        

    }

    // function myCart1(data){
    //     alert('g')
    // }

    var userid = 1;
    // localStorage.getItem("userid");
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbWVlckBnbWFpbC5jb20iLCJpYXQiOjE2Mzc1MDIxMTR9.3-TdCZybCc4KAEHOqNETQ_nv-xGilADEGiL000Ftroc";
    // localStorage.getItem("token");
    const [user,setuser] = useState([]);
  

    // authToken())
    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.get(`http://10.85.92.138:8002/${userid}/cart`,{
                    headers:{
                        Authorization : "Bearer " + (token)
                    }
                })
                setuser(response.data.data);
            }catch(error){
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
                user.map((curItem) => {
                    return <Items key ={curItem.displayName} {...curItem} 
                    // cartUpdates={cartUpdate} 
                    alert = {myCart}
                    />;
                })
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