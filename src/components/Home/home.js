import React from 'react';
import axios from 'axios';
import DealItems from './DealItems';
import './home.css'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            deals: [],
            otherProds: [],
            selectedCategory: 'Mobile'
        }
    }

    componentDidMount(){
        axios.get('db.json').then(res=>{
            this.setState({
                deals: res.data,
            })
        }).catch(err=>{
            console.log(err);
        })

        axios.get('db.json').then(res=>{
            this.setState({
                otherProds: res.data
            })
        }).catch(err=>{
            console.log(err);
        })
    }

    handleCategoryChange=(e)=>{
        console.log(e.target.value);
        this.setState({
            selectedCategory: e.target.value,
        })
    }

    render(){

        return(
            <div className="container-fluid" style={{marginTop: '1rem'}}>
                <h2 id="heading">Today's Deal Products</h2>
                <div className="row" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {this.state.deals.length!==0?<DealItems items={this.state.deals} />:<div></div>}
                </div>
                <h2 id="heading">Other Products</h2>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <select className="form-select" aria-label="Deafult" 
                value={this.state.selectedValue} 
                onChange={this.handleCategoryChange}
                style={{width:"fit-content"}}>
                    <option value="Mobile">Mobile</option>
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