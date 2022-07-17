import React from 'react';

import {PlanProvider} from './Context/PlanContext'

import NavBar from './Components/NavBar';
import SearchAerodrome from './Components/SearchAerodrome';
import GeoCourse from './Components/GeoCourse';
import Aircraft from './Components/Aircraft';
import Meteo from './Components/Meteo';
import "bootstrap/dist/css/bootstrap.min.css";
const Home = ({correoUsuario, uid})=>{     


    return(    
        
        <>
        <PlanProvider >
        <NavBar correoUsuario={correoUsuario}/>
        <div className="wrapper">
            <h1 className='text-center'>Welcome to VFR Nav Planner</h1>          
            <div>
                <Aircraft />
            </div>
            <div>
                <h4 className="text-center">Partida</h4>
                <SearchAerodrome punto='partida'/>
            </div>
            <div>
                <h4 className="text-center">Destino</h4>
                <SearchAerodrome punto='llegada'/>
            </div>
            <div>
                <GeoCourse />
            </div>
            <div>
                <Meteo />
            </div>
        
        </div>
        </PlanProvider>
        </>)

}
export default Home;