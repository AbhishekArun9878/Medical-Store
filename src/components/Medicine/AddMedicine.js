import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import checkAuth from "../Auth/checkAuth";

function AddMedicine() {
    var user = useSelector((store)=>store.auth.user);

    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date,setExpiry_date] =useState('');

    var navigate = useNavigate();

     function addMedicine() {
        
        axios.post('https://medicalstore.mashupstack.com/api/medicine',
        {   name: name,
            company: company,
            expiry_date:expiry_date
        },{
            headers:{'Authorization':"Bearer "+ user.token}})
            .then(response=>{
            navigate('/listmedicine')
            })
         
    }
    return (
    <div>
        <Navbar/><br></br>
        <div className="container-fluid rounded"style={{width:"650px"}} >
            <div className="row mt-5">
                <div className="col-12 mb-3 mt-3 mr-3">
                    <h1 className="text-center">Add Medicine</h1><br></br>
                    
                    <div className="form-group ">
                        <input 
                        type="text" 
                        className="form-control  mb-4 bg-light border border-light" 
                        value={name} 
                        onChange={(event)=>{setName(event.target.value)}}
                        placeholder="Medicine Name"
                        
                        />
                    </div>
                    <div className="form-group">                       
                        < input
                        type ="text" 
                        className="form-control  mb-4 bg-light border border-light" 
                        value={company} 
                        onChange={(event)=>{setCompany(event.target.value)}}
                        placeholder="Company"
                        />
                    </div>
                    <div className="form-group">                        
                        <input
                        type="date"
                        className="form-control  mb-4 bg-light border border-light" 
                        value={expiry_date} 
                        onChange={(event)=>{setExpiry_date(event.target.value)}}
                        placeholder="Expiry Date"
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success" onClick={addMedicine}>Submit</button>
                    <Link to="/listmedicine" className="btn btn-secondary float-right">Back</Link>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    )
}

export default checkAuth(AddMedicine);