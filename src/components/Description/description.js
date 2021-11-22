
import React, { useState,useEffect } from 'react'
import { useParams} from 'react-router-dom'
import axios from 'axios'

import Rater from './rating.js'

import authToken from '../authToken'
function Description(props) 
{
    
    const {name} = useParams()
    const [state,setDescription] = useState({products:{}})
    const [sta,setQunatity] = useState({quant:0})
    const [st,setR] = useState({r:{}})
    const [isDisplay,setDisplay] = useState(false)
    const [o,setOrders] = useState({orders:[]})
    const [f,setFeedback] = useState({feedback:""})
    const [r,setrate] = useState({rate:0})
    const [rt,setRt] = useState({rating:5})
    const [g,setG] = useState({gr:[]})
    

    const loggedInUser = localStorage.getItem('userId')
    const effect =  useEffect(() => {
        
        axios.get("http://10.85.92.138:8002/searchproduct/"+name,authToken()).then((res) => {
          // console.log(res.data)
            setDescription({products:res.data.data[0]})
            
            setR({r:res.data[0].avgRating})
            setG({gr:res.data[0].avgRating.reviews})
           
        }).catch((err) => {
            console.log(err)
        })
       
        
        
    },[])
    console.log(st.r.reviews)
   
var gr = st.r.reviews
    var l = st.r.reviews?.length
console.log(gr)
    var j
    var x = false
    var y = false
    var sum = 0
    for(var t=0;t<l;t++) {
        sum = sum + st.r.reviews[t].rating
    }
    console.log(sum)
var avg=sum/l

   

    var i
    var rate
    function fstars(rate) {
        let filled_stars = []
        for(i=0;i<rate;i++)
        {
            filled_stars.push(
                <span style={{fontSize:"150%",color:"yellow"}}>&#9733;</span>
            )
        }
        return filled_stars
    }
    function estars(rate) {
        let empty_stars=[]
        for(i=0;i<5 - rate;i++)
        {
            empty_stars.push(
                <span style={{fontSize:"150%",color:"lightgrey"}}>&#9733;</span>
            )
        }
        return empty_stars
    }
    
    console.log(r.rate)


    const get_quantity = (e) => {
        console.log(e.target.value)
        setQunatity({quant:e.target.value})

    }
      
    
    const productName = state.products.displayName
    const sellerName = state.products.seller
    const quantity = sta.quant
    const category = state.products.category
    
    const addtocart = () => {
        if(loggedInUser !="" && loggedInUser != null)
            axios.post("http://10.85.92.138:8002/"+loggedInUser+"/addtocart",{productName,sellerName,quantity,category},authToken()).then((res) => {
                console.log("post call for adding cart")
                if(res.status === true){
                    alert("Item added to cart successfully")
                }
                else {
                    
                    const item = {"productName":state.products.displayName,"sellerName":state.products.seller,"quantity":sta.quant,"category":state.products.category}
                    if(localStorage.getItem('items') == null ) {
                        const items = []
                        items.push(item)
                        localStorage.setItem('items',JSON.stringify(items))
                    }
                    else {
                        const items = JSON.parse(localStorage.getItem('items'))
                        items.push(item)
                        localStorage.setItem('items',JSON.stringify(items))
                    }

                              
                    alert("Item added to cart successfully")
                }
            }).catch((err) => {
                console.log(err)
        })
    
    }


    function give_feedback() {
        console.log("feed")
        x= false
        setDisplay({isDisplay:true})
    
    }
    function get_feedback(e) 
    {
        console.log(e.target.value)
        setFeedback({feedback:e.target.value})
    }
    const handleClick = (rt) => {
        console.log(rt)
        setRt({ rating: rt });
      }
    function submit_feedback()
    {
        var reviewComments = f.feedback
        var rating = rt.rating
        axios.post("http://10.85.92.138:8002/"+state.products.displayName+"/reviewproduct",{loggedInUser,reviewComments,rating},authToken()).then((res)=> {
            if(res.status == true) {
                
                alert("Review submitted Successfully")
            }
            else {
                alert("Review submition failed")
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    
    let review_button 
    if(x) {
        review_button = (
        <>
            <button className="btn" style={{backgroundColor:"#33CCCC",color:"#0A1172"}} onClick={give_feedback}>Give Feedback</button>
        </>
        )
    }
    else{
        review_button = null
    }

               return (     
                    <>
                 <div className="container">
                    <div className="row" style={{padding:"50px"}}>
                        <div class="col col-md-5">  
                            <div class="card" style={{width: "18rem",height:"18rem"}}>
                                <img class="card-img" style={{width: "18rem",height:"18rem"}} src={state.products.imageUrl} alt="Card image cap" />
                                
                            </div>
                        </div>
                    <br/>
                    <br/>
                    <div class="col col-md-3">  
                        <div className="card" style={ {width: "28rem",height:"26rem",backgroundColor:"#F0F8FF"} }>
                            <div className="card-body">
                                <h3 style={{color:"#728FCE"}}>{state.products.displayName}</h3>
                                <p>
                                    {fstars(avg)}
                                    {estars(avg)}
                                    &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; {l}  Customers reviewed
                                </p>
                                <hr/>
                                <p>
                                    <b>M.R.P : </b>
                                    <del>{state.products.price}</del>
                                </p>
                                <p>
                                    <b>Price : </b>
                                    {state.products.offerPrice}
                                </p>
                                <p>
                                    <b>You save : </b>
                                    {state.products.discount}
                                </p>
                                <p style={{color:"green"}}>
                                    In Stock
                                </p>
                                <b>Quantity :</b>
                                <input style={{width:"40px"}} type="number" name="quantity" id="quan" min="1" required onChange={get_quantity}></input>
                                <br/>
                                <br/>
                                <button className="btn" style={{backgroundColor:"#33CCCC",color:"#0A1172"}} onClick={addtocart}>Add to cart</button>
                            </div>

                        </div>
                    </div> 
                </div>
               
            </div>
            <div style={{padding:"0px 40px 10px 10px"}}>
             <h5 style={{color:"#728FCE"}}>Customer Reviews</h5>
             
             {g.gr.map((rev)=>{
                 return(
                     <>
                        <p>
                            {fstars(rev.rating)}
                            {estars(rev.rating)}
                            &nbsp; &nbsp;&nbsp;{rev.rating} out of 5
                        </p>
                        <p>By {rev.userId}</p>
                        <p>{rev.reviewComments}</p>
                        <hr></hr>
                    </>
                 )
             }
             )
            }
             </div>
             &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
             <div style={{pading:"0px 10px 10px 10px"}}>{review_button}</div>
             
              <div>
               <Rater value={rt.rating} maxlength="6" onSelected={handleClick} />
                
                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                <textarea id="feed" name="feedback_textbox" rows="3" cols="50" onChange={get_feedback}></textarea>
                <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" style={{backgroundColor:"#33CCCC",color:"#0A1172"}} onClick={submit_feedback} >submit Feedback</button>
              </div>
            
            </>  
                     
        )       
   
}

export default Description

