import React from 'react';
import '../styles/Navbar.css';
import {connect} from 'react-redux';
import {logout} from '../actions';

const Navbar =({logout, user})=>{
    
    return(
        <div className="navbar">
            <h3>Hack Ideas</h3>
            {user && <span>Employee:{user}<h5 onClick={logout} className="logout">Logout</h5></span>}
        </div>
    );
};
const mapStateToProps =(state)=>{
    return {user:state.user}
};
export default connect(mapStateToProps, {logout})(Navbar);