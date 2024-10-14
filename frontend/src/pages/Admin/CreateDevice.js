import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDevice } from '../../services/deviceService';
import { useSelector } from 'react-redux';

const CreateDevice = () => {
    const [formData, setFormData] = useState({
        user_id: '',
        device_plan: '',
        phone_no: '',
        expiry: '',
    });
    const navigate = useNavigate();
    const { token } = useSelector(state => state.auth);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createDevice(token, formData);
            alert('Device created successfully');
            navigate('/admin');
        } catch (error) {
            console.error('Error creating device:', error);
            alert('Failed to create device');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Create New Device</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleChange}
                    placeholder="User Id"
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="device_plan"
                    value={formData.device_plan}
                    onChange={handleChange}
                    placeholder="Device Plan"
                    required
                    style={styles.input}
                />
                <input
                    type="tel"
                    name="phone_no"
                    value={formData.phone_no}
                    onChange={handleChange}
                    placeholder="+1234567890"
                    required
                    style={styles.input}
                />
                <input
                    type="date"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="Expiry"
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Create Device</button>
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

export default CreateDevice;
