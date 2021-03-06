import React from 'react';

import { useContext} from "react";
import {PlanContext} from '../Context/PlanContext'
import * as turf from '@turf/turf'

const GeoCourse = () => {
    const { pto1, pto2 } = useContext(PlanContext);

    let from = turf.point([pto1.latitude, pto1.longitude]);
    let to = turf.point([pto2.latitude, pto2.longitude]);
    let options = {units: 'kilometers'};

    let distancia = turf.distance(from, to, options);

    let curso = turf.bearing(from, to);
    if (curso < 0){
        curso = curso + 360
    }
    return(
        <>        
            <div className="d-flex justify-content-center">
                <div className=" card bg-info m-3 bg-opacity-25" style={{width: 18 + 'rem'}}>
                    <div className="card-body">
                        <h5 className="card-title text-center m-0">Curso Geográfico</h5>                
                        <p className="card-text m-0">Dirección: {parseFloat(curso.toFixed(2))}°</p>
                        <p className="card-text m-0">Distancia: {parseFloat(distancia.toFixed(2))} Km  / {parseFloat((distancia/1.609).toFixed(2))}millas</p>
                                    
                    </div>
                </div>
            </div>        
        </>)
}
export default GeoCourse;