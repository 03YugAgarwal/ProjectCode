import { useState } from "react";
import { BASE_URL } from '../../constants';
import Cookies from 'js-cookie';

import styles from './ResetPasswordAdmin.module.css';

const ChangePassword = (props) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        if (oldPassword === '' || newPassword === '') {
            setError("Please fill in both password fields.");
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
            const response = await fetch(`${BASE_URL}/reset/${props.type}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`,
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            if (!response.ok) {
                const { message } = await response.json();
                throw new Error(message || "Failed to change password");
            }

            setSuccess(true);
            setOldPassword("");
            setNewPassword("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.reset}>
            <h2>Change Password</h2>
            <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Processing..." : "Submit"}
            </button>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>Password changed successfully!</p>}
        </div>
    );
};

export default ChangePassword;