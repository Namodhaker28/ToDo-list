import React , {useState}from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { config } from "../config";

export default function  Login() {
    const [password,setPassword]=useState()
    const [email,setEmail]=useState()
    const backend = config.backend_url

    const navigate = useNavigate();

    const loginUser = async ()=>{
        const credentials = {
            email: email,
            password: password,
        }
        console.log("credentials",credentials)

        try {
          const response = await  axios.post(`${backend}/signin`,credentials,{
           headers :{ "Content-Type":"application/json"}
          })
          if (response.status==200)
          {
            localStorage.setItem("token",response.data.tokens[0].token)
            navigate("/")
            window.location.reload()
          }
          console.log(response)
        } catch (error) {
            console.log(error)
        }
    }



  return (
    <div className="container-fluid  d-flex flex-column align-items-center ">
      <h1 className="py-4 my-4">Login</h1>
      <div class="mb-3 col-3">
        <label for="exampleFormControlInput1" class="form-label">
          Email address
        </label>
        <input
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
          type="email"
          class="form-control p-3"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
        />
        <label for="inputPassword5" class="form-label">
          Password
        </label>
        <input
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
          type="password"
          id="inputPassword5"
          class="form-control p-3"
          aria-labelledby="passwordHelpBlock"
        />
        <div className="row">
          <button type="submit" onClick={loginUser} on class=" my-4 btn btn-primary  ">
            Login
          </button>
        </div>
        <Link to="/signup">Create Account </Link>
      </div>
    </div>
  );
}
