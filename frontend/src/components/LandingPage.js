import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Import your specific CSS file for landing page

const LandingPage = () => {
    const navigate = useNavigate();

    const handleSelection = (userType) => {
        navigate(`/login/${userType}`);
    };

    return (
        <div className="landing-page">
            <h1>Welcome to Faculty Appraisal Portal</h1>
            <div className="selection-container">
                <button onClick={() => handleSelection('admin')} className="selection-button">
                    Admin
                </button>
                <button onClick={() => handleSelection('faculty')} className="selection-button">
                    Faculty
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
