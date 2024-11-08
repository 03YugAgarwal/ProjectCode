import { useLocation, useNavigate } from 'react-router-dom';
import styles from './AdminSidebar.module.css'
import Button from '../ui/Button';

const AdminSidebar = () => {

    const navigate = useNavigate()

    const location = useLocation()

  return (
    <div className={styles.nav}>
      <Button onClick={()=>navigate("/createteacher")} optionalCSS={location.pathname === '/createteacher' ? styles.glow : ' '}>Create Teacher</Button>
      <Button onClick={()=>navigate("/createstudent")} optionalCSS={location.pathname === '/createstudent' ? styles.glow : ' '}>Create Student</Button>
      <Button onClick={()=>navigate("/createcourse")} optionalCSS={location.pathname === '/createcourse' ? styles.glow : ' '}>Create Course</Button>
      <Button onClick={()=>navigate("/assign")} optionalCSS={location.pathname === '/assign' ? styles.glow : ' '}>Assign Students to Course</Button>
    </div>
  );
};

export default AdminSidebar;
