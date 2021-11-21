import React from 'react';




class Navbar extends React.Component{
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                <a className="navbar-brand" href="/">eKart</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarContent"
                aria-controls="navbarContent"
                aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/signup">Signup</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/profile">Profile</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/wishlist">Wishlist</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/notification">Notifications</a>
                        </li>
                        
                    </ul>
                    
                </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;