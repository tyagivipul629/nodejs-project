import {Link} from 'react-router-dom';
import './home.css';

function DealItems({items}){
    console.log(items);
    const dealItems=items.map(elem=>{
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
    return dealItems;
}

export default DealItems;