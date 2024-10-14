import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomer, updateCustomer } from '../../services/customerService';
import { useSelector } from 'react-redux';

const EditCustomer = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNo: '',
        location: '',
    });
    const { customerId } = useParams();
    const navigate = useNavigate();
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const customerData = await getCustomer(token, customerId);
                setFormData(customerData);
            } catch (error) {
                console.error('Error fetching customer:', error);
                alert('Failed to fetch customer data');
            }
        };
        fetchCustomer();
    }, [customerId, token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCustomer(token, customerId, formData);
            alert('Customer updated successfully');
            navigate('/admin/customerInfo');
        } catch (error) {
            console.error('Error updating customer:', error);
            alert('Failed to update customer');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Edit Customer</h2>
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
                <button type="submit" style={styles.button}>Update Customer</button>
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

export default EditCustomer;
