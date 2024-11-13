import { useEffect, useState, useContext } from "react";
import { BASE_URL } from "../../constants";
import Cookies from 'js-cookie';
import AssignmentCardTeacher from "../Layout/AssignmentCardTeacher";

import { AuthContext } from "../../context/AuthContext";

import styles from './UpdatePage.module.css'

const UpdatePage = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = Cookies.get('user_token');

    const {refetchAssignment} = useContext(AuthContext)

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}/student/teacher/get`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch assignments');

                const data = await response.json();
                setAssignments(data.assignments);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, [token, refetchAssignment]);

    return (
        <div className={styles.updatePage}>
            <h1>All Assignments:</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && assignments.length === 0 && <p>No assignments available</p>}
            {!loading && assignments.map((assignment) => (
                <AssignmentCardTeacher
                    key={assignment._id}
                    assignment={assignment}
                    navigateLink={`/update/${assignment._id}`}
                />
            ))}
        </div>
    );
};

export default UpdatePage;