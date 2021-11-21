import React, {useState} from "react"
import {Link} from 'react-router-dom';
import './SearchBar.css';

function SearchBar({placeholder,data}){
    const [filteredData,setfilteredData]=useState([]);
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        
        const newFilter = data.filter((value) => {
            return value.displayName.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setfilteredData([]);
          } else {
            setfilteredData(newFilter);
          }
        
    };
    return(
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder={placeholder} onChange={handleFilter}/>
                <div className="searchIcon">
                    
                </div>
            </div>
            {filteredData.length !==0 && (
            <div className="dataResult">

                { 
                    filteredData.slice(0,6).map((value,key)=>{
                        return (
                         <a 
                         style={{
                            display:'flex',
                           justifyContent:'center',
                           alignItems:'center'}}
                         className="dataItem" href={value.link} target="_blank">
                             
                         <Link to={`/description/${value.displayName}`} style={{textDecoration: 'none', color: 'black', maxWidth: 'fit-content'}}>
            <div className="card" id="dealCard">
                <img src={value.imageUrl} className="card-img-top" alt="Not visible" />
                <div className="card-body">
                    <h5>{value.displayName}</h5>
                    <p>{value.shortDesc}</p>
                    <span id="discount">{value.discount}</span>
                </div>
            </div>
            
            <p>{value.displayName} </p> </Link>
                         </a>
                        );
                    })} 
            </div>
             ) }
        </div>
    )

}
export default SearchBar;