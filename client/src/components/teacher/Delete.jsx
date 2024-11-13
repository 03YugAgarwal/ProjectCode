import { useState, useContext } from 'react';
import { BASE_URL } from '../../constants';
import Cookies from 'js-cookie';

// import { AuthContext } from '../../context/AuthContext';

import styles from './Delete.module.css'

const Delete = (props) => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // const { refetchAssignment, setRefetchAssignment } = useContext(AuthContext);

    const handleClick = async () => {
        // Check if the input value is "Confirm"
        if (value !== 'Confirm') {
            setError("Please type 'Confirm' to delete.");
            return;
        }

        const token = Cookies.get('user_token');
        if (!token) {
            setError("User not authenticated.");
            return;
        }

        setLoading(true);
        setError('');
        setSuccess(false);

        

        try {
            const response = await fetch(`${BASE_URL}/student/delete/${props.assignment._id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `${token}`,
                },
            });

            if (!response.ok) {
                const { message } = await response.json();
                throw new Error(message || "Failed to delete assignment");
            }

            setSuccess(true);
            setValue(''); // Clear the input field
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        // setRefetchAssignment(!refetchAssignment)
        window.location.reload();
    };

    return (
        <div className={styles.reset}>
            <h2>Delete Assignment</h2>
            <p>
                To delete the assignment <strong>{props?.assignment?.title}</strong>, please type
                <strong> Confirm </strong> below.
            </p>
            <input
                type="text"
                placeholder="Confirm"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={handleClick} disabled={loading}>
                {loading ? "Deleting..." : "Delete"}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Assignment deleted successfully!</p>}
        </div>
    );
};

export default Delete;