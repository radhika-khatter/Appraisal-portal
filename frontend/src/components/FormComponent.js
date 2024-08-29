import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './FormComponent.css';

const FormComponent = () => {
    const { userType } = useParams();
    const navigate = useNavigate(); // Hook for navigation
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [formType, setFormType] = useState('signup'); // Track form type

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let url;
            if (formType === 'signup') {
                url = userType === 'faculty' ? 'http://localhost:3000/api/auth/signup/faculty' : 'http://localhost:3000/api/auth/signup/admin';
            } else {
                url = userType === 'faculty' ? 'http://localhost:3000/api/auth/signin/faculty' : 'http://localhost:3000/api/auth/signin/admin';
            }

            const response = await axios.post(url, user);

            if (response && response.data) {
                console.log('Response:', response.data);
                setError(null);
                if (formType === 'signup') {
                    alert('Credentials added, now you can sign in');
                } else {
                    navigate(`/panel/${userType}`); // Navigate to the appropriate page
                }
            } else {
                console.error('Unexpected response:', response);
            }
        } catch (error) {
            if (error.response) {
                console.error('Error:', error.response.data);
                setError(error.response.data.msg || 'An error occurred');
            } else {
                console.error('Error:', error.message);
                setError('Server error');
            }
        }
    };

    return (
        <>
        <div className="form-page">
            <header className="form-header">
                <h1>Welcome {userType.charAt(0).toUpperCase() + userType.slice(1)}</h1>
            </header>
            <div className="form-container">
                <div className="form-content">
                    <h2>{formType === 'signup' ? 'Sign Up' : 'Sign In'} as {userType.charAt(0).toUpperCase() + userType.slice(1)}</h2>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        {formType === 'signup' && (
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                            />
                        )}
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                        <button type="submit">{formType === 'signup' ? 'Sign Up' : 'Sign In'}</button>
                    </form>
                    <button onClick={() => setFormType(formType === 'signup' ? 'signin' : 'signup')}>
                        Switch to {formType === 'signup' ? 'Sign In' : 'Sign Up'}
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default FormComponent;
