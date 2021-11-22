import React from 'react';

class Navbar extends React.Component{
    logoutUser=()=>{
        localStorage.removeItem('user');
        localStorage.removeItem('userid');
        localStorage.removeItem('token');
        this.props.unsetUser();
    }
    render(){
        console.log(this.props);
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                <a className="navbar-brand" href="/">eKart</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
                aria-controls="navbarContent"
                aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/"><i className="fa fa-home"></i>Home</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/signup"><i className="fa fa-user-plus"></i>Signup</a>
                        </li>
                        {this.props.userid==''&&<li className="nav-item active">
                            <a className="nav-link" href="/login"><i className="fa fa-sign-in"></i>Login</a>
                        </li>}
                        {this.props.userid&&<>
                        <li className="nav-item active">
                            <a className="nav-link" href="/orders"><i className="fa fa-first-order"></i>My Orders</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/Cart"><i className="fa fa-shopping-cart"></i>Cart<span style={{padding: '3px',backgroundColor: 'red',color: 'white',marginLeft: '2px'}}>{this.props.cartCount}</span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/search"><i className="fa fa-search"></i>Search</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/notifications"><i className="fa fa-bell"></i>Notifications <span style={{padding: '3px', backgroundColor: 'red',color: 'white'}}>2</span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/profile"><i className="fa fa-user"></i>Profile</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/wishlist"><i className="fa fa-heart"></i>Wishlist</a>
                        </li>
                        </>}
                    </ul>
                    {this.props.userid!=''&&<form className="d-flex">
        <button class="btn btn-outline-success" type="submit" onClick={this.logoutUser}><i className="fa fa-sign-out"></i>Logout</button>
      </form>}
                </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;