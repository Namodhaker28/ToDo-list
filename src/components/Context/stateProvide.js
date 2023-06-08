import react, { useState } from 'react';
import StateContext from './StateContext';

const StateProvider = ({children})=>{

    const [tasks,setTasks] =useState();

    const contextValue = {
        tasks,setTasks
    }

    return <StateContext.Provider value={contextValue}>{children}</StateContext.Provider>
}

export default StateProvider