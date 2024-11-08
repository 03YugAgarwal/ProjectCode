// import { Outlet } from 'react-router-dom'
import AdminSidebar from "../Admin/AdminSidebar";
import styles from "./AdminHome.module.css";

const AdminHome = () => {
  return (
    <>
      <AdminSidebar />
      <div className={styles.container}>
        <div className={styles.placeholder}></div>
      </div>
    </>
  );
};

export default AdminHome;
