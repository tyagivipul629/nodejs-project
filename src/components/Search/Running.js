import React from 'react';
import Search from './search';
import ProductData from './db.json'

class Running extends React.Component{
    render(){
        return(
            
                 <Search placeholder="Search products"data={ProductData} />
                   
        );
    }
}

export default Running;