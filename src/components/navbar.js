import React from "react";
import { Link } from "react-router-dom";

export default class Navbar extends React.Component{
  
  logOut = () =>{
    window.location = '/login'
    localStorage.clear()
  }
    render(){
        return(
            <div className="container">
              <nav className="navbar navbar-expand-lg navbar-light bg-grey">
                <Link className="navbar-brand" to="/">Navbar</Link>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
             <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/customer">Customer</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/product">Product</Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link active" to="/login">Login</Link>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link active" onClick={()=> this.logOut()}>Logout</Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link active" to="/cart">Cart</Link>
                </li> */}
              </ul>
              </div>
              </nav>
            </div>
        )
    }
}