import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ViewMark.css';

const ViewMark = () => {
    const [marksData, setMarksData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMarksData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/marks');
                if (response.data && response.data.data) {
                    setMarksData(response.data.data);
                }
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching marks data:", error);
            }
        };
        fetchMarksData();
    }, []);

    return (
        <div className="view-mark-container">
            <div className="back-button" onClick={() => navigate('/admin')}>
                <span className="arrow">←</span> Back to Admin
            </div>
            <h1 className="view-mark-header">Tac Marks</h1>
            <table className="view-mark-table">
                <thead>
                    <tr>
                        <th>PID</th>
                        <th>Admin Marks</th>
                        <th>Reviewer Marks</th>
                        <th>Total Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {marksData.length > 0 ? (
                        marksData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.PID}</td>
                                <td>{item.AdminMark || 'N/A'}</td>
                                <td>{item.UserMark || 'N/A'}</td>
                                <td>{item.Total || 0}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="no-data">
                                No Marks Data Available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewMark;
