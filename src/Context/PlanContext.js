import { createContext, useState } from "react";

export const PlanContext=createContext({} );
export const PlanProvider = ({ children }) => {
    const [pto1, setPto1] = useState({'latitude':0, 'longitude':0});
    const [pto2, setPto2] = useState({'latitude':0, 'longitude':0});    
    //funiciones
    function addWayPoint1(lat1, lon1){
        console.log('addWayPoint1')
        setPto1({'latitude':lat1, 'longitude':lon1})
    }
    function addWayPoint2(lat2,lon2){
        console.log('addWayPoint2')
        setPto2({'latitude':lat2, 'longitude':lon2})
    }

    return (
        <PlanContext.Provider
        value={{ pto1, pto2, addWayPoint1, addWayPoint2 }}
        >
        {children}
        </PlanContext.Provider>
    );
    };