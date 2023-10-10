import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import checkAuth from "../Auth/checkAuth";
import { useNavigate } from "react-router-dom";


function EditMedicine()  {
    var  user= useSelector(store=>store.auth.user);
    var navigate =useNavigate();

    const {medicineId} = useParams();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date,setExpiry_date] = useState('');
    
    useEffect(()=>{
        axios.get('https://medicalstore.mashupstack.com/api/medicine/'+medicineId,
        { headers:{'Authorization':'Bearer ' + user.token }},).then(response=>{
            setName(response.data.name);
            setCompany(response.data.company);
            setExpiry_date(response.data.expiry_date);
        })
    },[medicineId ,user.token]);
    function updateMedicine(){
        axios.post('https://medicalstore.mashupstack.com/api/medicine/'+medicineId,
        {
            name: name,
            company: company,
            expiry_date:expiry_date
        },{ headers:{'Authorization':'Bearer ' + user.token 
        }}).then(response=>{
            navigate('/listmedicine')
        })
    }
    return <div>
        <Navbar/>
        <div className="container-fluid rounded"style={{width:"650px"}}>
            <div className="row mt-5">
                <div className="col-12 mb-3 mt-3 mr-3">
                    <h1 className="text-center">Edit Medicine</h1>
                    
                    <div className="form-group">
                        <label>Medicine Name</label>
                        <input 
                        type="text" 
                        className="form-control mb-3 bg-light border border-light" 
                        value={name} 
                        onChange={(event)=>{setName(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Company</label>
                        <input
                        type="text"
                        className="form-control mb-3 bg-light border border-light" 
                        value={company} 
                        onChange={(event)=>{setCompany(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Expiry Date</label>
                        <input
                        type="date"
                        className="form-control mb-3 bg-light border border-light" 
                        value={expiry_date} 
                        onChange={(event)=>{setExpiry_date(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success" onClick={updateMedicine}>Submit</button>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
}

export default checkAuth(EditMedicine);