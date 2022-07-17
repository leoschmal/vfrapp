import React from 'react';
import fetch from "node-fetch";
import { useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext} from "react";
import {PlanContext} from '../Context/PlanContext'

const Meteo = () => { 
    const { pto1 } = useContext(PlanContext);
    
    const [meteo, setMeteo] = useState(null);
    //const apikey = '9e0a77fadc6544fe9cedf9b2358e86e7'
    const apikey = process.env.REACT_APP_API_KEY_METEO;
    let Pto1 = {'lat':pto1.latitude, 'long':pto1.longitude}
    

    const cargarDatos = ()=>{fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${Pto1.long}&lon=${Pto1.lat}&appid=${apikey}&units=${'metric'}`)
        .then((response) => response.json())
        .then((jsonData) => {
        //console.log(jsonData)
        setMeteo(jsonData)
        });}

    useEffect(() => {
        cargarDatos();
    }, [pto1]);
    return(
        <>
        <h4 className="text-center">Meteorología Actual - Partida</h4>
        {meteo ? (
        <>
        <div className="card-group">
        <div className="card bg-info m-3 bg-opacity-25" style={{width: 18 + 'rem'}}>
            <div className="card-body">
                <h5 className="card-title">{meteo.name}</h5>                
                <p className="card-text m-0">Hora: {new Date(meteo.dt * 1e3).toISOString().slice(-13, -5)}UTC</p>
                <p className="card-text m-0">Temp: {meteo.main.temp}°C</p>
                <p className="card-text m-0">Presión(snm): {meteo.main.pressure}hPa</p>
                <p className="card-text m-0">Nubosidad: {meteo.clouds.all}%</p>
                <p className="card-text m-0">Visibilidad: {meteo.visibility} m</p>
                
            </div>
        </div>
        <div className="card bg-info m-3 bg-opacity-25" style={{width: 18 + 'rem'}}>
            <div className="card-body">
                <h5 className="card-title">Viento</h5>                
                <p className="card-text m-0">Intensidad: {meteo.wind.speed} m/seg - {meteo.wind.speed * 1.944} nudos</p>
                <p className="card-text m-0">Dirección: {meteo.wind.deg}°</p>
                <p className="card-text m-0">Ráfagas: {meteo.wind.gust}m/seg</p>
                
            </div>
        </div>  
        </div>     
        </>
        ):(<p>Esperando Datos</p>)}
        </>
        )
}
export default Meteo;