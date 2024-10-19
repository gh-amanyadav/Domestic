import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCustomer } from '../../services/customerService';
import { useSelector } from 'react-redux';

const CreateCustomer = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNo: '',
        location: '',
        password: '',
        confirmPassword: '', // Add confirmPassword to state
    });
    const navigate = useNavigate();
    const { token } = useSelector(state => state.auth);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if password and confirmPassword match
        if (formData.password !== formData.confirmPassword) {
            alert('Password and Confirm Password do not match');
            return; // Stop form submission if passwords do not match
        }

        try {
            await createCustomer(token, formData);
            alert('Customer created successfully');
            navigate('/admin/customerInfo');
        } catch (error) {
            console.error('Error creating customer:', error);
            alert('Failed to create customer');
        }
    };

    // Handle back button click
    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div style={styles.container}>
            {/* Back Button */}
            <button onClick={handleBackClick} style={styles.backButton}>Back</button>

            <h2 style={styles.header}>Create New Customer</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    style={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    style={styles.input}
                />
                <input
                    type="tel"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    style={styles.input}
                />
                {/* Confirm Password Input */}
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Create Customer</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        backgroundColor: '#fff',
        position: 'relative', // Ensure back button is positioned relative to the container
    },
    backButton: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: '#000000',
        color: '#fff',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    header: {
        textAlign: 'center',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        margin: '10px 0',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    button: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default CreateCustomer;
