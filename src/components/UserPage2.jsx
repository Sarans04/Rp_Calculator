import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Use this for navigation
import './UserPage2.css';
import axios from 'axios';

const UserPage2 = () => {
    const navi = useNavigate();
    const location = useLocation();
    const pid = location.state?.pid || null;

    const [marks, setMarks] = useState({
        clearObjectives: '',
        originalityCreativity: '',
        technicalProficiency: '',
        implementation: '',
        documentationPresentation: '',
        teamworkCollaboration: '',
        userExperience: '',
        continuousImprovement: '',
        problemSolving: '',
        innovation: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const testObj = {
        "PID": 70,
        "marks": marks,
         "markPerson":"user"   
    }
    

    const handleChange = (field, value) => {
        setMarks((prevMarks) => ({ ...prevMarks, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!marks.clearObjectives || !marks.originalityCreativity || !marks.technicalProficiency || !marks.implementation  || !marks.problemSolving || !marks.documentationPresentation || !marks.teamworkCollaboration  || !marks.userExperience || !marks.continuousImprovement || !marks.innovation) {
            setError('Please fill all fields before submitting.');
            return;
        }
        const userMark = Object.values(marks).reduce((total, mark) => total + Number(mark), 0);
        console.log(userMark);
        alert(`User Mark (Reviewer): ${userMark}`);
        try {
            const res = await axios.post("http://localhost:4000/marks", {
                "PID": pid,
                "marks": userMark,
                "markPerson": "user"
            });
            if (res) {
                console.log("Data stored");
            }
        } catch (error) {
            console.error(error);
        }
        setError('');
        setTimeout(() => {
            navigate('/user'); // Navigate to the /user page
        }, 2000);
    };
    
    return (
        <div className="user-page">
            <h2 className="user-header">Reviewer’s Marks</h2>
            <div className="user-content">
                <div className="form-section-left">
                    <form className="user-form" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="clear-objectives">Clear Objectives (out of 5): </label>
                            <select
                                id="clear-objectives"
                                value={marks.clearObjectives}
                                onChange={(e) => handleChange('clearObjectives', e.target.value)}
                            >
                                <option value="" disabled>Choose</option>
                                {[...Array(6).keys()].map((mark) => (
                                    <option key={mark} value={mark}>
                                        {mark}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="originality-creativity">Originality & Creativity (out of 5): </label>
                            <select
                                id="originality-creativity"
                                value={marks.originalityCreativity}
                                onChange={(e) => handleChange('originalityCreativity', e.target.value)}
                            >
                                <option value="" disabled>Choose</option>
                                {[...Array(6).keys()].map((mark) => (
                                    <option key={mark} value={mark}>
                                        {mark}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="technical-proficiency">Technical Proficiency (out of 5): </label>
                            <select
                                id="technical-proficiency"
                                value={marks.technicalProficiency}
                                onChange={(e) => handleChange('technicalProficiency', e.target.value)}
                            >
                                <option value="" disabled>Choose</option>
                                {[...Array(6).keys()].map((mark) => (
                                    <option key={mark} value={mark}>
                                        {mark}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="implementation">Implementation (out of 5): </label>
                            <select
                                id="implementation"
                                value={marks.implementation}
                                onChange={(e) => handleChange('implementation', e.target.value)}
                            >
                                <option value="" disabled>Choose</option>
                                {[...Array(6).keys()].map((mark) => (
                                    <option key={mark} value={mark}>
                                        {mark}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="problem-solving">Problem Solving (out of 5): </label>
                            <select
                                id="problem-solving"
                                value={marks.problemSolving}
                                onChange={(e) => handleChange('problemSolving', e.target.value)}
                            >
                                <option value="" disabled>Choose</option>
                                {[...Array(6).keys()].map((mark) => (
                                    <option key={mark} value={mark}>
                                        {mark}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className="form-section-right">
                    <form className="user-form">
                        <div>
                            <label htmlFor="documentation-presentation">Documentation & Presentation (out of 5): </label>
                            <select
                                id="documentation-presentation"
                                value={marks.documentationPresentation}
                                onChange={(e) => handleChange('documentationPresentation', e.target.value)}
                            >
                                <option value="" disabled>Choose</option>
                                {[...Array(6).keys()].map((mark) => (
                                    <option key={mark} value={mark}>
                                        {mark}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="teamwork-collaboration">Teamwork & Collaboration (out of 5): </label>
                            <select
                                id="teamwork-collaboration"
                                value={marks.teamworkCollaboration}
                                onChange={(e) => handleChange('teamworkCollaboration', e.target.value)}
                            >
                                <option value="" disabled>Choose</option>
                                {[...Array(6).keys()].map((mark) => (
                                    <option key={mark} value={mark}>
                                        {mark}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="user-experience">User Experience & Usability (out of 5): </label>
                            <select
                                id="user-experience"
                                value={marks.userExperience}
                                onChange={(e) => handleChange('userExperience', e.target.value)}
                            >
                                <option value="" disabled>Choose</option>
                                {[...Array(6).keys()].map((mark) => (
                                    <option key={mark} value={mark}>
                                        {mark}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="continuous-improvement">Continuous Improvement & Iteration (out of 5): </label>
                            <select
                                id="continuous-improvement"
                                value={marks.continuousImprovement}
                                onChange={(e) => handleChange('continuousImprovement', e.target.value)}
                            >
                                <option value="" disabled>Choose</option>
                                {[...Array(6).keys()].map((mark) => (
                                    <option key={mark} value={mark}>
                                        {mark}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="innovation">Innovation (out of 5): </label>
                            <select
                                id="innovation"
                                value={marks.innovation}
                                onChange={(e) => handleChange('innovation', e.target.value)}
                            >
                                <option value="" disabled>Choose</option>
                                {[...Array(6).keys()].map((mark) => (
                                    <option key={mark} value={mark}>
                                        {mark}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserPage2;
