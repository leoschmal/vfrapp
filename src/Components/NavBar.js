import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import firebaseApp from '../credenciales';
import {getAuth, signOut} from "firebase/auth";
const auth = getAuth(firebaseApp);

const NavBar = ({correoUsuario}) => {
return(
  <>
    <nav className="navbar navbar-light bg-light">
    <div className="container-fluid">
        <a className="navbar-brand" href="/">
        <img src="/logo512.png" alt="" width="30" height="24" className="d-inline-block align-text-top"/>
        VFR Planner
        </a>
        <p className="d-inline-block align-text-center mb-0">{correoUsuario}</p>
        <button className="btn" onClick={()=>signOut(auth)}>Salir</button>
    </div>
    </nav>
  </>)
}
export default NavBar;