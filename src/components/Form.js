import React, { useContext, useState } from "react";
import axios from "axios";
import { fetchTodos } from "../App";
import StateContext from "./Context/StateContext";
import { config } from "../config";

function Form(props) {
  const [name, setName] = useState("");
  const dataContext = useContext(StateContext)
  const backend = config.backend_url
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    const todo = {
      isActive: true,
      todo: name,
    };

    const config = {
      url: `${backend}/todo`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      data: todo,
    };
    try {
      const res = await axios(config);
      console.log(res);
      const  response = await fetchTodos()
      dataContext.setTasks(response)
      setName("");
    } catch (error) {
      console.log(error);
    }
  };
  return (

    <div>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>

      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button onClick={handleSubmit} className="btn btn__primary btn__lg">
        Add
      </button>
    </div>
  );
}

export default Form;
