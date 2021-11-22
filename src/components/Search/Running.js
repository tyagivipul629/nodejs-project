import axios from 'axios';
import React from 'react';
import Search from './search';
import authToken from '../authToken';
import ProductData from './db.json'

const url='http://10.85.92.138:8002/products'

class Running extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data: []
        }
    }
    componentDidMount(){
        axios.get(url,authToken()).then(res=>{
            if(res.data.status==true)
                this.setState({
                    data: res.data.data
                })
            else 
                alert("There is no product in database!")
        })
    }
    render(){
        return( 

         <Search placeholder="Search products" data={this.state.data} />
                   
        );
    }
}

export default Running;