import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Signup() {

    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConf, setPasswordConf] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();

    function SignupUser(){
        var user = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConf
        }
        axios.post('https://medicalstore.mashupstack.com/api/register',user).then(response=>{
            setErrorMessage('');
            navigate('/login');
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            }else{
                setErrorMessage('Failed to connect to api');
            }
    })
}
    return (
      <div>
        <Navbar></Navbar><br></br>
        <div className="container-fluid rounded "style={{width:"650px"}}  >
            <div className="row mt-5">                
                <div className="col-12 mb-3 mt-3 mr-3">
                    <h1 className="text-center">SignUp</h1>

                    {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}<br></br>

                    <div className="form-group">
                        <input type="text"
                        className="form-control mb-4 bg-light border border-light"
                        value={name}
                        onInput={(event)=>setName(event.target.value)}
                        placeholder="Name"
                        />
                    </div>
                    
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
                        className="form-control mb-4  bg-light border border-light "
                        value={password}
                        onInput={(event)=>setPassword(event.target.value)}
                        placeholder="Password"
                        />
                    </div>
                    <div className="form-group ">
                        <input type="password"
                        className="form-control mb-4  bg-light border border-light"
                        value={passwordConf}
                        onInput={(event)=>setPasswordConf(event.target.value)}
                        placeholder="Confirm Password"
                        />
                    </div>
                    <div className="form-group">
                        <button className=" col-12 btn btn-success" onClick={SignupUser}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
       </div>
      
    );
  }
  
  export default Signup;