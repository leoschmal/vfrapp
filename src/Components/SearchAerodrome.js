import React from 'react';
import { useState, useEffect, useContext} from "react";
import firebaseApp from "../credenciales";
import {getFirestore, getDocs, collection} from "firebase/firestore";
import Autosuggest from 'react-autosuggest';
import "bootstrap/dist/css/bootstrap.min.css";
import {PlanContext} from '../Context/PlanContext'

const SearchAerodrome =(props)=>{
  const { pto1, pto2, addWayPoint1, addWayPoint2 } = useContext(PlanContext);
  //console.log('pto1',pto1)
  //console.log('pto2',pto2)
    //========================
    const[data, setData]= useState([]);
    const [aerodromos, setAerodromos] = useState([]);
    const[value, setValue]= useState("");
    const[aerodromoSeleccionado, setAerodromoSeleccionado]= useState({});
    
    const onSuggestionsFetchRequested=({value})=>{
      setAerodromos(filtrarAerodromos(value));
    }
    
    const filtrarAerodromos=(value)=>{
        const inputValue=value.trim().toLowerCase();
        const inputLength=inputValue.length;
    
      var filtrado=data.filter((aerodromo)=>{
        var textoCompleto=aerodromo.denominacion;
    
        if(textoCompleto.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(inputValue)){
          return aerodromo;
        }
      });
    
      return inputLength===0 ? [] : filtrado;
    }
    
    const onSuggestionsClearRequested = () =>{
      setAerodromos([]);
    }
    
    const getSuggestionValue=(suggestion)=>{
      return `${suggestion.denominacion}`;
    }
    
    const renderSuggestion=(suggestion)=>(
      <div className='sugerencia' onClick={()=>seleccionarAerodromo(suggestion)}>
        {`${suggestion.denominacion}`}
      </div>
    );
    
    const seleccionarAerodromo=(aerodromo)=>{
      setAerodromoSeleccionado(aerodromo);
      console.log('props',props.punto)
      console.log('aerodromo',aerodromo)
      if(props.punto === 'partida'){
        pto1.latitude = aerodromo.latitud;
        pto1.longitude = aerodromo.longitud;        
        addWayPoint1(pto1.latitude, pto1.longitude)
        
                                    }
      if(props.punto === 'llegada'){        
        pto2.latitude = aerodromo.latitud;
        pto2.longitude = aerodromo.longitud; 
        addWayPoint2(pto2.latitude, pto2.longitude)
                                    }
    }
    


    const onChange=(e, {newValue})=>{
      setValue(newValue);
    }
    
    const inputProps={
    placeholder:"Nombre del Aerodromo",
    value,
    onChange
    };
    
    const eventEnter=(e)=>{
    if(e.key === "Enter"){
      var aerodromoActual = data.filter(p => p.denominacion === e.target.value.trim());
    
      //console.log(personajeActual);
      var aerodromo ={
        ref: aerodromoActual[0].ref,
        denominacion: aerodromoActual[0].denominacion,        
      };      
      seleccionarAerodromo(aerodromo);
    }
    }
    //=============================
    useEffect(()=>{//Cargo los aerodromos de Argentina    
        const firestore = getFirestore(firebaseApp);
        getDocs(collection(firestore, "airports"))
        .then((snapshot) => {
                  let array = snapshot.docs.map((doc) => (doc.data()));                
                  setData(array);
                  //console.log(array);
        })
        .catch((err) => alert(err))     
    }, []);
    return(
        <>        
        <div className="App">
            <div className="d-flex justify-content-around">
                <div className="text-center mb-3">
                    <Autosuggest 
                    suggestions={aerodromos}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    onSuggestionSelected={eventEnter}
                    />     
                    <button className='btn btn-primary mt-2' onClick={()=>seleccionarAerodromo}>Confirmar</button>
                </div>
                        {
                            aerodromoSeleccionado.denominacion ? (  <><div>
                                                                        <p>{aerodromoSeleccionado.denominacion}</p>
                                                                        <p>{aerodromoSeleccionado.coordenadas}</p>
                                                                        <p>{aerodromoSeleccionado.local}</p>
                                                                        </div>
                                                                    </>):(<div><p>Seleccione aerodromo</p></div>)
                        }
            </div>
        </div>
    </>
    )
}
export default SearchAerodrome;