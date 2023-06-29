import React, { useContext } from "react";
import StateContext from "./Context/StateContext";
import axios from "axios";
 import { config } from "../config";

function FilterButton(props) {
  const dataContext = useContext(StateContext)
  const backend = config.backend_url
   const Filter = async () =>{
    var fetchUrl
    if(props.name!=="All")
    fetchUrl =`${backend}/user?isActive=${props.name === 'Active' ? true : false}`
    else
    fetchUrl =`${backend}/user`
    const config = {
      url: fetchUrl,
      method: 'GET',
      headers: {
        Authorization:localStorage.getItem("token")
      },
    }
    try {
      const res = await axios(config)
      dataContext.setTasks(res?.data?.todos)
    } catch (error) {
      console.log(error);
    }
  } 

  return (
    <button
      type="button"
      className="btn toggle-btn"
      onClick={() => Filter()}
    >
      <span>{props.name}</span>
    </button>
  );
}

export default FilterButton;