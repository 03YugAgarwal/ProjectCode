import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar";

const RootLayout = () => {
  
  const location = useLocation()
  // console.log(location);
  

  return (
    <>
      {location.pathname !== '/login' && <Navbar />}
      <Outlet />
    </>
  );
};

export default RootLayout;
