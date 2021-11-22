import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import './wish.css';
import authToken from "../authToken";


const url="http://10.85.92.138:8002";

class wishlist extends React.Component {
    constructor(){
        super();
        this.state={
            wishList: [],
        }
    }

    componentDidMount(){
        const userid=localStorage.getItem('userid');
        this.setState({
            userid: userid
        },()=>{
            axios.get(url+`/${userid}/wishlist`,authToken()).then(res=>{
                if(res.data.data.length!=0)
                {const wishlist=res.data.data[0].wishlist;
                this.setState({
                    wishList: wishlist
                })}
            })
        })
        
    }

    addToCart=(id,name,category)=>{
        axios.post(`/${this.state.userid}/addtocart`,
        {"productName": name,"sellerName":"NA","quantity":1,"category":category},authToken()).then((res)=>{
            if(res.data.status=="Success"){
                alert("Item added to cart successfully");
                this.setState({
                    wishlist: this.state.wishlist.filter(elem=>elem._id!=id)
                })
            }
        })
    }

    removeItem=(id)=>{
        axios.post(url+`/${this.state.userid}/wishlist/${id}/remove`,{},authToken()).then(res=>{
            if(res.data.status=="success"){
                alert("Item removed from wishlist successfully!");
                this.setState({
                    wishlist: this.state.wishlist.filter(elem=>elem._id!=id)
                })
            }
        })
    }

    render()
    {
        const wishListItem=this.state.wishList.map(elem=>{
            return(
                <Link to={`description/${elem.displayName}`}>
                <div className="card" id="wishCard">
                    <img src={elem.imageUrl} className="card-img-top" alt="Not visible" />
                    <div className="card-body">
                        <h5 id="heading">{elem.displayName}</h5>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <button className="bg-success" onClick={()=>this.addToCart(elem._id,elem.displayName,elem.category)}>Add To Cart</button>
                            <button className="bg-danger" onClick={()=>this.removeItem(elem._id)}>Remove</button>
                        </div>
                    </div>
                </div>
                </Link>
            );
        })
        return(
            <div className="container-fluid" style={{marginTop: '1rem'}}>
                <div className="row">
                    {this.state.wishList.length==0?<h2 style={{textAlign: 'center'}}>Wishlist empty!!</h2>:wishListItem}
                </div>
            </div>

        );
    }
}
export default wishlist;
