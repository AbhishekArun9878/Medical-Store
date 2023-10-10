import axios from "axios";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MedicineListItem(props) {
    var  user= useSelector(store=>store.auth.user);

        var date = new Date();
        var Expiry = new Date(props.medicine.expiry_date);
        

    function deleteMedicine() {
        const conf = window.confirm('Do you want to delete');
        if (conf){
            axios.delete('https://medicalstore.mashupstack.com/api/medicine/' + props.medicine.id,{
            headers:{'Authorization':'Bearer '+ user.token}
        
        }).then(response =>{
            alert(response.data.message)
            props.refresh()

        })
        
        }
    }
    function colorchange(){
        if(Expiry<date){
            return <span style={{color:'red'}}>{props.medicine.expiry_date}</span>
        }
        else{
            return <span style={{color:'green'}}>{props.medicine.expiry_date}</span>
        }  
        }
    
    return <div className="card">
        <div className ="card-body">
            <b>Medicine Name:</b>{props.medicine.name}<br></br>
            <b>Company:</b>{props.medicine.company}<br></br>
            <b>Expiry Date:</b>{colorchange()}<br></br>
             
            <button className ="btn btn-danger float-right" data-toggle="modal" data-target="#myModal" onClick={deleteMedicine}>Delete</button>
            <Link to={'/listmedicine/' + props.medicine.id + "/edit"} className="btn btn-warning float-left">Update</Link><br></br>
        </div>
      </div>
   
    
}
export default MedicineListItem;