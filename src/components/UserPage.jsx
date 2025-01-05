import React, { useContext, useState } from 'react';
import { PIDsContext } from './PIDsContext';
import './UserPage.css'; // Import the CSS file
import reviewImage from '../assets/review.jpg'; // Corrected path
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
    const { pids } = useContext(PIDsContext);
    const [selectedPid, setSelectedPid] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedPid) {
            setError('submitting.');
            return;
        }
        setError('');
        navigate('/user2', { state: { pid: selectedPid } });
    };

    const handleDownload = () => {
        if (!selectedPid) {
            setError('Please select a PID to download the PDF.');
            return;
        }
        setError('');

        // Open PDF in a new tab
        const pdfPath = `/pdfs/${selectedPid}.pdf`; // Assuming PDFs are stored in the public/pdfs folder
        window.open(pdfPath, '_blank'); // Open the PDF in a new browser tab
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="user-page">
            <h2 className="user-header">Reviewer’s Marks</h2>
            <span><h6 className="logout-font" onClick={handleLogout}>Logout</h6></span>
            <div className="user-content">
                <div className="image-section">
                    <h3 className="image-title">Team Communication</h3>
                    <img src={reviewImage} alt="Review" className="user-image" />
                </div>
                <div className="form-section">
                    <p className="welcome-text">Welcome, Reviewer! You can Download PDFs here...</p>

                    {pids.length > 0 ? (
                        <form className="user-form" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="pid-select">Select PID: </label>
                                <select
                                    id="pid-select"
                                    value={selectedPid}
                                    onChange={(e) => setSelectedPid(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Choose
                                    </option>
                                    {pids.map((pid) => (
                                        <option key={pid} value={pid}>
                                            {pid}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {error && <p className="error-message">{error}</p>}

                            <div className="button-div-download">
                                <button type="button" onClick={handleDownload}>
                                    Download PDF
                                </button>
                            </div>
                            <div className="button-div-submit">
                                <button type="submit">Next Page</button>
                            </div>
                        </form>
                    ) : (
                        <p>No PIDs available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserPage;
