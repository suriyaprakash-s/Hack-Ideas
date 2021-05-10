import React from 'react'
import {connect} from 'react-redux';
import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import Navbar from './components/Navbar';
import setAuthToken from './utils/setAuthToken';
import {loadUser} from './actions'

function App({user, loadUser}) {

  //load the user if already logged in
  React.useEffect(()=>{
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      loadUser();
    }
  },[loadUser]);

  return (
    <div>
      <Navbar/>
      {user ? <Landing/>:<Login/>}
    </div>
  );
}
const mapStateToProps =(state)=>{
  return {user: state.user};
}; 
export default connect(mapStateToProps, {loadUser})(App);
