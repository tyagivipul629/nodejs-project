import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './home.css'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            deals: [],
            otherProds: []
        }
    }

    componentDidMount(){
        axios.get('db.json').then(res=>{
            this.setState({
                deals: res.data
            })
        }).catch(err=>{
            console.log(err);
        })
    }

    render(){

        const dealItems=this.state.deals.map(elem=>{
            return(
                <Link to={`/description/${elem.displayName}`} style={{textDecoration: 'none', color: 'black', maxWidth: 'fit-content'}}>
                <div className="card" id="dealCard">
                    <img src={elem.imageUrl} className="card-img-top" alt="Not visible" />
                    <div className="card-body">
                        <h5>{elem.displayName}</h5>
                        <p>{elem.shortDesc}</p>
                        <span id="discount">{elem.discount}</span>
                    </div>
                </div>
                </Link>
            );
        })

        return(
            <div className="container-fluid" style={{marginTop: '1rem'}}>
                <h2 id="heading">Today's Deal Products</h2>
                <div className="row" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {this.state.deals.length!==0?dealItems:<div></div>}
                </div>
                <h2 id="heading">Other Products</h2>
                <select className="form-select" aria-label="Deafult">
                    <option selected>Mobile</option>
                    <option>Laptop</option>
                    <option>Camera</option>
                    <option>Watch</option>
                    <option>Headphone</option>
                    <option>Television</option>
                </select>
            </div>
        );
    }
}

export default Home;