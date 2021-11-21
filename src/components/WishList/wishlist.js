import React from "react";
//import axios from "axios";
class wishlist extends React.Component {
    constructor(){
        super();
        //this.setstate=details{[]}
    }

    change=(e,name)=>{
        e.preventDefault();
        //let newobj={
         
       // }
        if(name==="bag")
        {
            console.log("Item moved to the cart");
        }
        if(name==="card")
        {
            console.log("Item is Removed");
        }
           // axios.post("details.json/guest/addtocart",newobj)
            //.then((res)=>console.log(res.data))
            //.catch((err)=>console.log(err))
    }
    render()
    {
        return(
            <React.Fragment>
                <form>
                    <h2 style={{color:"grey"}}>Your favourites</h2>
                    <figure>
                        <img src="https://image.shutterstock.com/z/stock-photo-minsk-belarus-april-notebook-samsung-series-ultra-os-windows-samsung-group-412675369.jpg"
                        height={200}
                        width={190}/>
                        <h4 style={{marginLeft:"60px",textAlign:"left",color:"black"}}>Samsung</h4>
                    </figure>
                    <button 
                    type="submit"
                    style={{
                        marginLeft:"60px",
                        backgroundColor:"blue",
                        color:"white"
                    }}
                    onClick={(e)=>this.change(e,"bag")}>Move to Cart</button>
                    <button
                    type="submit"
                    style={{backgroundColor:"blue",color:"white"}}
                     onClick={(e)=>this.change(e,"card")}>Remove</button>
                </form>
            </React.Fragment>

        );
    }
}
export default wishlist;
