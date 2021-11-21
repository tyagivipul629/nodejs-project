import React from 'react';
import axios from 'axios';
import DealItems from './DealItems';
import './home.css'
import authToken from '../authToken';
import { Redirect } from 'react-router-dom';

const url='http://10.85.92.138:8002';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            deals: [],
            recommended: [],
            otherProds: [],
            selectedCategory: 'Phone'
        }
    }

    componentDidMount(){
        axios.get(url+'/deals',authToken()).then(res=>{
            if(res.data.status==true)
                this.setState({
                    deals: res.data.data,
                })
        }).catch(err=>{
            console.log(err);
        })

        axios.get(url+'/products',authToken()).then(res=>{
            this.setState({
                otherProds: res.data.data
            })
        }).catch(err=>{
            console.log(err);
        })
        

        /*axios.get(url+'/recommendatons').then(res=>{
            this.setState({
                recommended: res.data
            })
        }).catch(err=>{
            console.log(err);
        })*/
    }

    handleCategoryChange=(e)=>{
        console.log(e.target.value);
        this.setState({
            selectedCategory: e.target.value,
        })
    }

    render(){
        if(localStorage.getItem('userid')==null) return <Redirect to="/login" />;

        return(
            <div className="container-fluid" style={{marginTop: '1rem'}}>
                <h2 id="heading">Today's Deal Products</h2>
                <div className="row" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {this.state.deals.length!==0?<DealItems items={this.state.deals} />:<div></div>}
                </div>
                <h2 id="heading">Recommended Products</h2>
                <div className="row" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {this.state.recommended.length!==0?<DealItems items={this.state.recommended} />:<div><h3 style={{textAlign: 'center'}}>No recommended products as of now</h3></div>}
                </div>
                <h2 id="heading">Other Products</h2>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <select className="form-select" aria-label="Deafult" 
                value={this.state.selectedValue} 
                onChange={this.handleCategoryChange}
                style={{width:"fit-content"}}>
                    <option value="Phone">Mobile</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Camera">Camera</option>
                    <option value="Watch">Watch</option>
                    <option value="Headphone">Headphone</option>
                    <option value="Television">Television</option>
                </select>
                </div>
                <div className="row" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {this.state.otherProds.length!==0?<DealItems items={this.state.otherProds.filter(elem=>elem.category.toLowerCase()==this.state.selectedCategory.toLowerCase())} />:<div></div>}
                </div>
            </div>
        );
    }
}

export default Home;


