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
    useEffect(()=>{
        const firestore = getFirestore(firebaseApp);
        getDocs(collection(firestore, "aircrafts"))
        .then((snapshot) => {
                  let array = snapshot.docs.map((doc) => (doc.data()));                
                  setData(array);                  
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
                                                                        <div className="card bg-info m-3 bg-opacity-25" style={{width: 18 + 'rem'}}>
                                                                        <img src={aeronaveSeleccionada.url} className="card-img-top m-0" alt={aeronaveSeleccionada.matricula}/>
                                                                        <div className="card-body m-0">
                                                                          <h5 className="card-title text-center m-0 p-0">{aeronaveSeleccionada.matricula}</h5>
                                                                        <p className="m-0">{aeronaveSeleccionada.marca}</p>
                                                                        <p className="m-0">{aeronaveSeleccionada.modelo}</p>                                                                        
                                                                        </div>
                                                                      </div>
                                                                                                                                               
                                                              </div>
                                                                    </>):(<div><p>Seleccione aeronave</p></div>)
                        }
            </div>
        </div>
    </>
    )
}
export default Aircraft;