import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const FacultyPanel = () => {
    const [appraisals, setAppraisals] = useState([]);

    useEffect(() => {
        // Fetch faculty appraisal data from the server
        axios.get('/api/faculty-appraisals')
            .then(response => {
                setAppraisals(response.data);
            })
            .catch(error => {
                console.error('Error fetching faculty appraisals:', error);
            });
    }, []);

    const handleDownload = () => {
        // Implement functionality to download data in PDF format
        axios.get('/api/download-appraisals', { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'faculty_appraisals.pdf');
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(error => {
                console.error('Error downloading appraisals:', error);
            });
    };

    return (
        <div className="container my-4">
            <h1 className="mb-4">Faculty Dashboard</h1>
            <button onClick={handleDownload} className="btn btn-primary mb-4">Download Appraisals</button>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Faculty Name</th>
                            <th>Research Publications</th>
                            <th>Event Participation</th>
                            <th>Seminars</th>
                            <th>Projects</th>
                            <th>Lectures</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appraisals.map((appraisal, index) => (
                            <tr key={index}>
                                <td>{appraisal.facultyName}</td>
                                <td>{appraisal.researchPublications}</td>
                                <td>{appraisal.eventParticipation}</td>
                                <td>{appraisal.seminars}</td>
                                <td>{appraisal.projects}</td>
                                <td>{appraisal.lectures}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FacultyPanel;
