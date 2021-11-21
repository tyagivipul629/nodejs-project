import React from 'react';
import SearchBar from './SearchBar.js';
import ProductData from './db.json'

class Running extends React.Component{
    render(){
        return(
            
                 <SearchBar placeholder="Search products" data={ProductData} />
                   
        );
    }
}

export default Running;