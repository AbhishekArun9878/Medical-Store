import { createBrowserRouter } from "react-router-dom";
import App from './App';
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/login";
import AddMedicine from "./components/Medicine/AddMedicine";
import ListMedicine from "./components/Medicine/ListMedicine";
import EditMedicine from "./components/Medicine/EditMedicine";
import SearchMedicine from "./components/Medicine/SearchMedicine";


const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'signup', element: <Signup/> },
    { path: 'login', element: <Login/> },
    { path: 'addmedicine', element: <AddMedicine/> },
    { path: 'listmedicine', element: <ListMedicine/> },
    { path: 'listmedicine/:medicineId/edit', element: <EditMedicine/> },
    { path:"searchmedicine",element:<SearchMedicine/>}  
]);
export default router;
