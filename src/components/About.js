import React,{useEffect, useState} from "react";
import "./about.css";
import '@fortawesome/fontawesome-free/css/all.css';
import axios from "axios";

export default function About() {
  const [user,setUser]=useState();
  

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/v1/user',{
          headers:{
            Authorization:localStorage.getItem('token')
          }
        })
        setUser(res.data)
      } catch (error) {
        console.log("error while getting user data", error);
      }
    };
    getUserData()
   
  }, []);

  return (
    <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
      {" "}
      <div class="card p-4">
        {" "}
        <div class=" image d-flex flex-column justify-content-center align-items-center">
          {" "}
          <button class="btn btn-secondary">
            {" "}
            <img
              src="https://i.imgur.com/wvxPV9S.png"
              height="100"
              width="100"
            />
          </button>{" "}
          {console.log(user)}
          <span class="name mt-3">{user?.name}</span>{" "}
          <span class="idd">{user?.email}</span>{" "}
          <div class="d-flex flex-row justify-content-center align-items-center gap-2">
            {" "}
            <span class="idd1">{user?.phone}</span>{" "}
      
          </div>{" "}
          <div class="d-flex flex-row justify-content-center align-items-center mt-3">
            {" "}
            <span class="number">
              1069 <span class="follow">Followers</span>
            </span>{" "}
          </div>{" "}
          <div class=" d-flex mt-2">
            {" "}
            <button class="btn1 btn-dark">Edit Profile</button>{" "}
          </div>{" "}
          <div class="text mt-3">
            {" "}
            <p>
            You are not a drop in the ocean. You are the entire ocean in a drop.
           
              <br />  <br /><b>DEVELOPER/ TRADER</b> 
           
            </p>
          </div>{" "}
          <div class="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
            {" "}
            <span>
            <i class="fa-brands fa-twitter"></i>
            </span>{" "}
            <span>
            <i class="fa-brands fa-facebook-f"></i>
            </span>{" "}
            <span>
            <i class="fa-brands fa-instagram"></i>
            </span>{" "}
            <span>
            <i class="fa-brands fa-linkedin-in"></i>
            </span>{" "}
          </div>{" "}
          <div class=" px-2 rounded mt-4 date ">
            {" "}
            <span class="join">{user?.joinedOn}</span>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
}
