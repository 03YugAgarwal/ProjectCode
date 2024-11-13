import { useLocation, useNavigate } from 'react-router-dom';
import styles from './AdminSidebar.module.css'
import Button from '../ui/Button';
import { useState } from 'react';
import Modal from '../ui/Modal';
import ResetPasswordAdmin from './ResetPasswordAdmin';
import ChangePassword from './ChangePassword';

const AdminSidebar = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [content, setContent] = useState(null)

    const navigate = useNavigate()

    const location = useLocation()

    // let content = null

    const handleResetPassword = (type) => {

      if(type === 'other'){
        setContent(<ResetPasswordAdmin />)
      }else{
        setContent(<ChangePassword />)
      }

      setIsOpen(true)
    }



  return (
    <>
    <Modal isOpen={isOpen}  onClose={()=>setIsOpen(false)}>
      {content}
    </Modal>
    <div className={styles.nav}>
      <Button onClick={()=>navigate("/createteacher")} optionalCSS={location.pathname === '/createteacher' ? styles.glow : ' '}>Create Teacher</Button>
      <Button onClick={()=>navigate("/createstudent")} optionalCSS={location.pathname === '/createstudent' ? styles.glow : ' '}>Create Student</Button>
      <Button onClick={()=>navigate("/createcourse")} optionalCSS={location.pathname === '/createcourse' ? styles.glow : ' '}>Create Course</Button>
      <Button onClick={()=>navigate("/assign")} optionalCSS={location.pathname === '/assign' ? styles.glow : ' '}>Assign Students to Course</Button>
    </div>
    <div className={styles.nav2}>
      <Button onClick={() =>handleResetPassword('other')}>Reset Password for Others</Button>
      <Button onClick={()=>handleResetPassword('my')}>Change Password</Button>
    </div>
    </>
  );
};

export default AdminSidebar;
