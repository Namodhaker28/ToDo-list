import React, { useContext } from "react";
import StateContext from "./Context/StateContext";
import axios from "axios";

function FilterButton(props) {
  const dataContext = useContext(StateContext)

   const Filter = async () =>{
    var fetchUrl
    if(props.name!=="All")
    fetchUrl =`http://localhost:4000/api/v1/user?isActive=${props.name === 'Active' ? true : false}`
    else
    fetchUrl =`http://localhost:4000/api/v1/user`
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