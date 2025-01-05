import React, { useState } from 'react';
import styles from './AdminPage2.module.css'; // Import the CSS Module
import adminImage from '../assets/admin.png'; // Corrected path
import { useNavigate, useLocation } from 'react-router-dom'; 
import axios from 'axios';

const AdminPage2 = () => {
        const navi = useNavigate();
        const location = useLocation();
        const pid = location.state?.pid || null;
    const [marks, setMarks] = useState({
        tacMarks: '',
        initialSubmission: '',
        finalSubmission: '',
        plagiarism: ''
    });
    const [adminMark, setAdminMark] = useState(0); // State to store admin marks
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMarks((prevMarks) => ({ ...prevMarks, [name]: value }));
    };

    const calculateAdminMark = () => {
        const { tacMarks, initialSubmission, finalSubmission, plagiarism } = marks;
        const total = [
            parseInt(tacMarks || 0, 10),
            parseInt(initialSubmission || 0, 10),
            parseInt(finalSubmission || 0, 10),
            parseInt(plagiarism || 0, 10)
        ].reduce((acc, curr) => acc + curr, 0);
        setAdminMark(total);
        return total; // Return the total for use in the alert
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!marks.tacMarks || !marks.initialSubmission || !marks.finalSubmission || !marks.plagiarism) {
            setError('Please fill all fields before submitting.');
            return;
        }
        const total = calculateAdminMark(); // Get the calculated total
        alert(`Admin Mark: ${total}`); 
        try{
            const adm = await axios.post("http://localhost:4000/marks",
                { "PID": pid,
                "marks": total,
                "markPerson":"admin"   });
            if(adm)
            {
                console.log("data stored")
            }
        }   catch(error) {
            console.log(error);
        }
        setError('');
        setSubmitted(true); // Show the submission message
        setTimeout(() => {
            navigate('/admin'); // Navigate to the admin page after a delay
        }, 2000); // Navigate to the next page
    };
    return (
        <div className={styles.userPage}>
            <h2 className={styles.userHeader}>Admin’s Marks</h2>
            <div className={styles.userContent}>
                <div className={styles.imageSection}>
                    <h3 className={styles.imageTitle}>Tac Marks</h3>
                    <img src={adminImage} alt="Admin" className={styles.userImage} />
                </div>
                <div className={styles.formSection}>
                    <p className={styles.welcome1Text}>Welcome, Admin! You can enter marks here...</p>

                    <form className={styles.userForm} onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="tacMarks">Tac Marks (0-5): </label>
                            <select
                                id="tacMarks"
                                name="tacMarks"
                                value={marks.tacMarks}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>
                                    Choose
                                </option>
                                {[0, 1, 2, 3, 4, 5].map((mark) => (
                                    <option key={mark} value={mark}>
                                        {mark}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="initialSubmission">Initial Submission (0-5): </label>
                            <select
                                id="initialSubmission"
                                name="initialSubmission"
                                value={marks.initialSubmission}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>
                                    Choose
                                </option>
                                {[0, 1, 2, 3, 4, 5].map((mark) => (
                                    <option key={mark} value={mark}>
                                        {mark}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="finalSubmission">Final Submission (0-5): </label>
                            <select
                                id="finalSubmission"
                                name="finalSubmission"
                                value={marks.finalSubmission}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>
                                    Choose
                                </option>
                                {[0, 1, 2, 3, 4, 5].map((mark) => (
                                    <option key={mark} value={mark}>
                                        {mark}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="plagiarism">Plagiarism (0-10): </label>
                            <select
                                id="plagiarism"
                                name="plagiarism"
                                value={marks.plagiarism}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>
                                    Choose
                                </option>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mark) => (
                                    <option key={mark} value={mark}>
                                        {mark}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {error && <p className={styles.errorMessage}>{error}</p>}
                        {submitted && (
                            <p className="success-message">Marks Submitted! Admin Mark: {adminMark}</p>
                        )}
                        <div className={styles.buttonDivSubmit}>
                            <button type="submit">Submit Marks</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminPage2;
