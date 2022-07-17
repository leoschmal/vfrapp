import React, { useState} from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Home';
import Login from './Login';
import firebaseApp from './credenciales';
import {getAuth, onAuthStateChanged} from "firebase/auth";

const auth = getAuth(firebaseApp);

function App() {

const [usuarioGlobal, setUsuarioGlobal] = useState(null);

onAuthStateChanged(auth, (usuarioFirebase)=>{
  if(usuarioFirebase){
    setUsuarioGlobal(usuarioFirebase);
  }else{
    setUsuarioGlobal(null);
  }
} );

  return (

    <>
    
    <div className='backgroundImage'>
    {usuarioGlobal ? <Home correoUsuario ={usuarioGlobal.email} uid={usuarioGlobal.uid}/> : <Login />}
    </div>
    
    </>
  );
}

export default App;
