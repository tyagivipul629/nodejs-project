import React, { useState } from "react";

const Items = ({ cartOfferPrice, productName, category, quantity,price}) => {
    const [quant,setQuant] = useState(quantity); 
    
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
                        <h4>{productName}</h4>
                    </div>
                </div>

                <div className="col">
                    <div className="category text-center mt-4">
                        <p className="display-7">{category}</p>
                    </div>
                </div>

                <div className="col">
                    <div className="add-minus-quantity text-center mt-4">
                        <i className="fas fa-minus" onClick={ ()=>{
                            minus()
                        }}></i>
                        <div className="">
                            <input type="number" placeholder="1" className="text-center" value={quant} min="0"/>
                        </div > 
                        <div>
                        <i className="fas fa-plus" onClick={ ()=>{
                            plus()
                        }}></i>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="price text-center price mt-4">
                        <p className="display-7">{price*quant}</p>
                    </div>
                </div>

                <div className="col">
                    <div className="remove-item text-center mt-4">
                        <button type="button" className="btn btn-danger" onClick={ ()=>{
                            alert('j')
                        }}>
                            Remove Item
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Items;
