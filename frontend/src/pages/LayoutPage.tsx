import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";


function Layout(){
    return(<>
        <NavBar></NavBar>
        <Outlet></Outlet>
    </>)
}

export default Layout