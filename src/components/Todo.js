import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import StateContext from "./Context/StateContext";
import { fetchTodos } from "../App";
import { config } from "../config";


function usePrevious(value) {

  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props) {
  const backend = config.backend_url  
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const dataContext = useContext(StateContext);

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    const body = { todo: newName };
    const config = {
      url: `${backend}/todo/${props.id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };
    try {
      const res = await axios(config);
      console.log(res);
      const response = await fetchTodos();
      dataContext.setTasks(response);
    } catch (error) {
      console.log(error);
    }

    setNewName("");
    setEditing(false);
  };

  const ToggleStatus = async () => {
    const config = {
      url: `${backend}/todo/status/${props.id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios(config);
      console.log(res);
      const response = await fetchTodos();
      dataContext.setTasks(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async () => {
    const config = {
      url: `${backend}/todo/${props.id}`,
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios(config);
      const response = await fetchTodos();
      console.log(response);
      dataContext.setTasks(response);
    } catch (error) {
      console.log(error);
    }
  };

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName || props.name}
          onChange={(e) => {
            setNewName(e.target.value);
          }}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => ToggleStatus()}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask()}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
