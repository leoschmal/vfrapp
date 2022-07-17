import React from 'react';
import { useState, useEffect} from "react";
import firebaseApp from "../credenciales";
import {getFirestore, getDocs, collection} from "firebase/firestore";
import Autosuggest from 'react-autosuggest';
import "bootstrap/dist/css/bootstrap.min.css";

const Aircraft =()=>{
    
    //========================
    const[data, setData]= useState([]);
    const [aeronaves, setAeronaves] = useState([]);
    const[value, setValue]= useState("");
    const[aeronaveSeleccionada, setAeronaveSeleccionada]= useState({});
    
    const onSuggestionsFetchRequested=({value})=>{
      setAeronaves(filtrarAeronaves(value));
    }
    
    const filtrarAeronaves=(value)=>{
        const inputValue=value.trim().toLowerCase();
        const inputLength=inputValue.length;
    
      var filtrado=data.filter((aeronave)=>{
        var textoCompleto=aeronave.modelo + " " + aeronave.matricula;
    
        if(textoCompleto.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(inputValue)){
          return aeronave;
        }
      });
    
      return inputLength===0 ? [] : filtrado;
    }
    
    const onSuggestionsClearRequested = () =>{
      setAeronaves([]);
    }
    
    const getSuggestionValue=(suggestion)=>{
      return `${suggestion.modelo} - ${suggestion.matricula}`;
    }
    
    const renderSuggestion=(suggestion)=>(
      <div className='sugerencia' onClick={()=>seleccionarAeronave(suggestion)}>
        {`${suggestion.modelo} - ${suggestion.matricula}`}
      </div>
    );
    
    const seleccionarAeronave=(aeronave)=>{
      setAeronaveSeleccionada(aeronave);
    }
    
    const onChange=(e, {newValue})=>{
      setValue(newValue);
    }
    
    const inputProps={
    placeholder:"Seleccione Aeronave",
    value,
    onChange
    };
    
    const eventEnter=(e)=>{
    if(e.key === "Enter"){
      var aeronaveActual = data.filter(p => p.marca === e.target.value.trim());
    
      //console.log(personajeActual);
      var aeronave ={
        marca: aeronaveActual[0].marca,
        modelo: aeronaveActual[0].modelo,
        matricula: aeronaveActual[0].matricula,
        
      };
      seleccionarAeronave(aeronave);
    }
    }
    //=============================
    useEffect(()=>{//Cargo los aerodromos de Argentina    
        const firestore = getFirestore(firebaseApp);
        getDocs(collection(firestore, "aircrafts"))
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
                    suggestions={aeronaves}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    onSuggestionSelected={eventEnter}
                    />     
                    <button className='btn btn-primary mt-2' onClick={()=>console.log(aeronaveSeleccionada)}>Confirmar</button>
                </div>
                        {
                            aeronaveSeleccionada.marca ? (  <><div>
                                                                        <p>{aeronaveSeleccionada.marca}</p>
                                                                        <p>{aeronaveSeleccionada.modelo}</p>
                                                                        <p>{aeronaveSeleccionada.matricula}</p>                                                                        
                                                                        </div>
                                                                    </>):(<div><p>Seleccione aeronave</p></div>)
                        }
            </div>
        </div>
    </>
    )
}
export default Aircraft;