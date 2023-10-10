import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListMedicineItem from './ListMedicineItem';
import checkAuth from "../Auth/checkAuth";
import { Link } from "react-router-dom";

function SearchMedicine() {
    const [search,setSearch] =useState('');
    const [allmedicine,setAllmedicine] = useState([]);
    const user = useSelector((store) => store.auth.user);

    useEffect(() => {
      filterMedicine();
      },[allmedicine]);
      
    function filterMedicine() {
      if(user && user.token){
        axios.get(`https://medicalstore.mashupstack.com/api/medicine`, {
          headers: { Authorization: 'Bearer ' + user.token },
        }).then((response) => {
          setAllmedicine(response.data);
        });
      }
    }
    
    const filteredMedicines = allmedicine.filter((value) => {
    return value.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="container mt-5">
      <div className="col-12 ">
        <h2 className="text-center">Search Result</h2>
      </div><br></br>
      <div className="form-group col-10 offset-1">
        <input 
          type="search"
          placeholder="search medicine"
          className="form-control"
          value={search}
          onChange={(event)=> setSearch(event.target.value)}
          /><br/>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className ="card-body bg-success"><br></br>
                    {filteredMedicines.length > 0 ? (
                      filteredMedicines.map((medicine) => (
                        <ListMedicineItem
                          key={medicine.id}
                          medicine={medicine}
                          refresh={filterMedicine}
                        />
                    ))
                    ) : (
                      <h5 colSpan="3" className="text-center">No medicine found</h5>
                      )}         
                </div>
              </div>
            </div>
            <Link to="/listmedicine" className="btn btn-secondary mt-3">Back</Link>
          </div>
           
        </div>
    </div>
  );
}

export default checkAuth(SearchMedicine);
