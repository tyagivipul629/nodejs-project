import React, {useState, useEffect} from "react";
import "./cart.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Items from "./Items";
import axios from "axios";

const cart = () => {
    // const [user,setuser] = useState(null);

    // useEffect(() = >{
    //     async function fetchData(){
    //         try {
    //             const response =  await axios.get("");
    //             setuser(response.data.cartdetails);
    //         }catch (error){
    //             console.log(error);
    //         }
    //     }
    //     fetchData();
    // },[]);

    // console.log(user);

    // const [Item,setItem] = useState(user);

return (

    <div className="m-3">
        
        <h1 className="m-3">Shopping cart</h1>
        
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
        {/* <div className="mt-5 px-5">
            <hr/>
        </div>

        <div className="cart-items-container">
            {item.map((curItem) => {
                return <Items key ={curItem.displayName} {...curItem} />;
            })}
        </div> */}

        {/* end products */}

        <div className="px-5 mx-5">
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

export default cart;