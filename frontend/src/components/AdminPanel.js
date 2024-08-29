import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPanel = () => {
    const [entries, setEntries] = useState([]);
    const [sortBy, setSortBy] = useState('name');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchEntries = useCallback(async () => {
        try {
            const response = await axios.get('/api/entries', { params: { sortBy } });
            setEntries(response.data);
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    }, [sortBy]);

    useEffect(() => {
        fetchEntries();
    }, [fetchEntries]); // Dependency array includes fetchEntries

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text('Faculty Self-Appraisal Entries', 10, 10);
        entries.forEach((entry, index) => {
            doc.text(`${index + 1}. Name: ${entry.name}, Employee Code: ${entry.code}, Date: ${entry.date}`, 10, 20 + (index * 10));
        });
        doc.save('faculty_entries.pdf');
    };

    const filteredEntries = entries.filter(entry => 
        entry.name.toLowerCase().includes(searchTerm) ||
        entry.code.toLowerCase().includes(searchTerm)
    );

    return (
        <Container className="my-4">
            <Row className="mb-4">
                <Col>
                    <h1 className="text-center mb-4">Admin Dashboard</h1>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={8}>
                    <Form.Control
                        type="text"
                        placeholder="Search by name or employee code"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Col>
                <Col md={4} className="d-flex justify-content-end">
                    <Button variant="primary" onClick={handleDownloadPDF}>
                        Download PDF
                    </Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={12}>
                    <Form.Select value={sortBy} onChange={handleSortChange}>
                        <option value="name">Sort by Name</option>
                        <option value="code">Sort by Employee Code</option>
                        <option value="date">Sort by Date</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Employee Code</th>
                                <th>Date of Submission</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEntries.map((entry, index) => (
                                <tr key={index}>
                                    <td>{entry.name}</td>
                                    <td>{entry.code}</td>
                                    <td>{entry.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminPanel;
