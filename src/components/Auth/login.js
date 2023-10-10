import axios from "axios";
import { useState} from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import Navbar from "../Navbar";
import {useNavigate} from 'react-router-dom';
import checkGuest from "./checkGuest";

function Login() {
    
      var [email, setEmail] = useState('');
      var [password, setPassword] = useState('');
      var [errorMessage, setErrorMessage] = useState('');
      const dispatch =useDispatch();
      const navigate =useNavigate();

      function LoginUser() {
        axios.post('https://medicalstore.mashupstack.com/api/login',{
          email:email,
          password:password
}).then(response=>{setErrorMessage('');

        var user ={
          email:email,
          token:response.data.token
        }
        dispatch(setUser(user));
        navigate('/listmedicine')
    }).catch(error=>{
      if(error.response.data.errors){
        setErrorMessage(Object.values(error.response.data.errors).join(''))
      }else{
        setErrorMessage('Failed to login user. Please contact admin')
    }
    })
      }
    return (
      <div>
        <Navbar/><br></br>
        <div className="container-fluid rounded "style={{width:"650px"}} >
            <div className="row mt-5">
                <div className="col-12 mb-3 mt-3 mr-3">
                    <h1 className="text-center">Login</h1>

                    {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}<br></br>
                    
                    <div className="form-group">
                        <input type="text"
                        className="form-control mb-4 bg-light border border-light"
                        value={email}
                        onInput={(event)=>setEmail(event.target.value)}
                        placeholder="Email Address"
                        />
                    </div>
                    <div className="form-group">
                        
                        <input type="password"
                        className="form-control mb-4 bg-light border border-light"
                        value={password}
                        onInput={(event)=>setPassword(event.target.value)}
                        placeholder="Password"
                        />
                    </div>
                    <div className="form-group">
                        <button className=" col-12 btn btn-success"onClick={LoginUser}>Login</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      
    );
  }
  
  export default checkGuest(Login);