import React, { useState, useRef, useEffect, useContext } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import NavbarComponent from "./components/navbar";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import axios from "axios";
import StateContext from "./components/Context/StateContext";

const FILTER_MAP = {
  All: "All",
  Active: "Active",
  Completed: "Completed",
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

export const fetchTodos = async () => {
  const config = {
    url: "http://localhost:4000/api/v1/user",
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios(config);
    console.log(res);
    return res?.data?.todos;
  } catch (error) {
    console.log(error);
  }
};

function App() {
  const dataContext = useContext(StateContext);

  const getTodos = async () => {
    const res = await fetchTodos();
    dataContext.setTasks(res);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTodos();
    }
  }, []);

  const taskList = dataContext?.tasks?.map((task) => (
    <Todo
      id={task?._id}
      name={task?.todo}
      completed={!task?.isActive}
      key={task?._id}
    />
  ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton key={name} name={name} />
  ));

  const Home = () => {
    return (
      <div className="todoapp stack-large">
        <Form />
        <div className="filters btn-group stack-exception">{filterList}</div>
        <h2 id="list-heading" tabIndex="-1">
          Your list of tasks
        </h2>
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {taskList}
        </ul>
      </div>
    );
  };

  const isAuthenticated = localStorage.getItem("token");
  return (
    <>
      {" "}
      <NavbarComponent />
      <Routes>
        <Route
          path="/about"
          element={isAuthenticated ? <About /> : <Login />}
        />
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
