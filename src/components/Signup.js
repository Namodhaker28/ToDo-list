import React ,{useState} from 'react'
import { Link ,useNavigate} from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert'
import { config } from '../config';
import  "./login.css";

export default function Signup() {
    const [password,setPassword]=useState()
    const [email,setEmail]=useState()
    const [phone,setPhone]=useState()
    const [name,setName]=useState()
    const backend = config.backend_url

    const navigate = useNavigate();

    const signUpUser = async ()=>{
        const userDetails = {
            email: email,
            password: password,
            phone: phone,
            name: name,
        }
        console.log("credentials",userDetails)

        if (!email  || !password  || !phone  || !name ){
          swal("Oops!", "Please fill all the details" ,"error");
          return
        }

        try {
          const response = await  axios.post(`${backend}/signup`,userDetails,{
           headers :{ "Content-Type":"application/json"}
          })
          console.log("response",response)
          if (response.status==200)
          {
            navigate("/login")
          }

        } catch (error) {
          swal("Oops!", error.response.data.message ,"error");
            console.log("errrr",error)
        }
    }

  return (
    <div className="container-fluid  d-flex flex-column align-items-center ">
      <h1 className="py-4 my-4"></h1>
      <div class="mb-3 col-3" >
        <label for="exampleFormControlInput1" class="form-label fs-5">
          Name
        </label>
        <input
        value={name}
        onChange={(e)=>{setName(e.target.value)}}
          type="name"
          class="form-control p-3"
          id="exampleFormControlInput1"
          placeholder=""
        />
        <label for="exampleFormControlInput1" class="form-label fs-5">
          Phone Number
        </label>
        <input
        value={phone}
        onChange={(e)=>{setPhone(e.target.value)}}
          type="number"
          class="form-control p-3"
          id="exampleFormControlInput1"
          placeholder=""
        />
        <label for="exampleFormControlInput1" class="form-label fs-5">
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
        <label for="inputPassword5" class="form-label fs-5">
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
        <div id="passwordHelpBlock" class="form-text">
          Your password must be minimum 8 characters long
        </div>
        <div className="row">
          <button type="submit"  onClick={signUpUser} class=" my-4 btn btn-primary  ">
            Register
          </button>
        </div>
        Alredy have an account
        <Link to="/Login" className="px-2">Login </Link>
      </div>
    </div>
  )
}
