import axios from "axios";
import { NavLink,useNavigate} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { removeUser } from "../store/authSlice";
 
function Navbar(){
    var user= useSelector((store)=>store.auth.user);
    const dispatch =useDispatch();
    const navigate = useNavigate();

    function logout(){
        if(user){
            axios.post('https://medicalstore.mashupstack.com/api/logout',{},{
                headers:{'Authorization':"Bearer "+ user.token}
            });
            dispatch(removeUser());
            navigate('/login');
        }
    }
    return(
        
        <nav className="navbar navbar-expand-sm navbar-dark bg-success">
           <div className="navbar-brand">
                <h4 className="text-light">Hash Medicalstore</h4>
            </div>
            <button
                className="navbar-toggler bg-light text-dark w-10% h-10%"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
            </button>
            <div
                className="collapse navbar-collapse mr-auto"
                id="navbarNav"
                style={{ float: "left" }}
            >
            <ul className="navbar-nav ml-auto" style={{color: "#ffffff"}}>
                <li className="nav-item ">
                <NavLink 
                to={"/"} 
                className={'nav-link text-light' +
                (status => status.isActive ? 'active':'')
                }
                >
                    Home
                </NavLink>
                </li>&nbsp;&nbsp;
                
                <li className="nav-item">
                <NavLink 
                to={"/signup"}
                className={"nav-link text-light"+ 
                (status => status.isActive? 'active':'')
                }
                >
                   Signup
                </NavLink>
                </li>&nbsp;&nbsp;

             { user?
                <li className="nav-item">
                    <span className="nav-link" onClick={logout}>Logout</span>
                </li>:
                    <li className="nav-item"> 
                <NavLink 
                to={"/login"}
                className={"nav-link text-light"+ 
                (status => status.isActive? 'active':'')
                }
                >
                   Login
                </NavLink>
                </li>
            }
        </ul> 
            </div>   
        </nav>
        
        
    )
}
export default Navbar;