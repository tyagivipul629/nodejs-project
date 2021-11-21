import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import authToken from "../authToken";


const url="http://10.85.92.138:8002";

class wishlist extends React.Component {
    constructor(){
        super();
        this.state={
            wishList: [],
            userid: ''
        }
    }

    componentDidMount(){
        const userid=localStorage.getItem('userid');
        this.setState({
            userid: userid
        },()=>{
            axios.get(url+`/${userid}/wishlist`,{},authToken()).then(res=>{
                const wishlist=res.data.wishlist;
            })
        })
        
    }

    addToCart=(elem)=>{

    }

    removeItem=()=>{
        //axios.post(url+``)
    }

    render()
    {
        const wishListItem=this.state.wishList.map(elem=>{
            return(
                <Link to={`description/${elem.displayName}`}>
                <div className="card" id="wishCard">
                    <img src={elem.imageUrl} className="card-img-top" alt="Not visible" />
                    <div className="card-body">
                        <h5>{elem.displayName}</h5>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <button className="bg-success" onClick={()=>this.addToCart()}>Add To Cart</button>
                            <button className="bg-danger" onClick={()=>this.removeItem()}>Remove</button>
                        </div>
                    </div>
                </div>
                </Link>
            );
        })
        return(
            <div className="container-fluid" style={{marginTop: '1rem'}}>
                <div className="row">
                    {wishListItem}
                </div>
            </div>

        );
    }
}
export default wishlist;
