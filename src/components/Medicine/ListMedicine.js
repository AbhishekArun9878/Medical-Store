import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link,useNavigate } from "react-router-dom";
import Navbar from '../Navbar';
import ListMedicineItem from './ListMedicineItem';
import { useSelector } from 'react-redux';
import checkAuth from '../Auth/checkAuth';

function ListMedicines() {
    var  user= useSelector(store=>store.auth.user);
    var [medicines,setMedicines] = useState([]);

    var navigate =useNavigate();
    
    function fetchMedicines() {
        if(user && user.token){
            axios.get("https://medicalstore.mashupstack.com/api/medicine",{
                headers:{'Authorization':'Bearer '+ user.token}
            }).then(response=>{
                setMedicines(response.data)    
            }); 
        }  
    }
    useEffect(()=>{
        fetchMedicines()
    },[medicines]);

    function Search(){
        navigate('/searchmedicine');
    };
    return (
        <div>
            <Navbar/><br></br>
            <div className ="container">
                <div className ="row">
                    <div className="col-12">
                        <h1 className='text-center my-4'>Medicine Details</h1>
                    </div>
                </div>
                <div className="row">
                    <div className= "col-10 offset-1">
                            <Link to="/addmedicine" className='btn btn-primary mb-2 '>Add Medicine</Link> 

                            <div className="col-1 float-right">
                                
                                <button className='btn btn-secondary' onClick={Search}>Search</button>
                            </div>
            
                            {medicines.map(medicine =><ListMedicineItem
                            key ={medicine.id} 
                            medicine={medicine} 
                            refresh={fetchMedicines}/>)}

                        </div>
                    </div>
                    
                
            </div>
        </div>
    )
}
export default checkAuth(ListMedicines);