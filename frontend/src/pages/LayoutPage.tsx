import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

function Layout() {
  return (
    <>
      <div className="h-screen overflow-hidden">
        <NavBar></NavBar>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default Layout;
