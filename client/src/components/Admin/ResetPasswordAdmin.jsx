import { useState } from "react";
import { BASE_URL } from '../../constants';
import Cookies from 'js-cookie';

import styles from './ResetPasswordAdmin.module.css';

const ResetPasswordAdmin = () => {
    const [type, setType] = useState("");
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        // Check if type and id are filled
        if (type === '' || id === '') {
            setError("Please select a type and enter a unique ID.");
            return;
        }
        
        const token = Cookies.get('user_token');
        if (!token) {
            setError("User not authenticated.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const response = await fetch(`${BASE_URL}/reset/byadmin`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`,
                },
                body: JSON.stringify({ type, userid: id }),
            });

            if (!response.ok) {
                const { message } = await response.json();
                throw new Error(message || "Failed to reset password");
            }

            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.reset}>
            <h2>Reset Password</h2>
            <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
            </select>
            <input
                placeholder="Unique ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Processing..." : "Submit"}
            </button>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>Password reset successful!</p>}
        </div>
    );
};

export default ResetPasswordAdmin;