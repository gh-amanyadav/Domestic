import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDeviceById, updateDevice } from '../../services/deviceService';
import { useSelector } from 'react-redux';

const UpdateDevice = () => {
    const [formData, setFormData] = useState({
        user_id: '',
        device_plan: '',
        phone_no: '',
        expiry: '',
    });
    const { deviceId } = useParams();
    const navigate = useNavigate();
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        const fetchDevice = async () => {
            try {
                const deviceData = await getDeviceById(token, deviceId);
                // Ensure all form fields have a defined value
                setFormData({
                    user_id: deviceData.device.user_id || '',
                    device_plan: deviceData.device.device_plan || '',
                    phone_no: deviceData.device.phone_no || '',
                    expiry: deviceData.device.expiry || '',
                });
            } catch (error) {
                console.error('Error fetching Device Info:', error);
                alert('Failed to fetch Device data:' + error.message);
            }
        };
        fetchDevice();
    }, [deviceId, token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDevice(token, deviceId, formData);
            alert('Device Info updated successfully');
            navigate('/admin');
        } catch (error) {
            console.error('Error updating Device Info', error);
            alert('Failed to update Device Info');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Edit Device Info</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleChange}
                    placeholder="user_id"
                    required
                    style={styles.input}
                    disabled={true}
                />
                <input
                    type="text"
                    name="device_plan"
                    value={formData.device_plan}
                    onChange={handleChange}
                    placeholder="device_plan"
                    required
                    style={styles.input}
                />
                <input
                    type="tel"
                    name="phone_no"
                    value={formData.phone_no}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    style={styles.input}
                />
                <input
                    type="date"
                    name="expiry"
                    value={formData.expiry.split('T')[0]}
                    onChange={handleChange}
                    placeholder="expiry"
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Update Device Info</button>
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

export default UpdateDevice;
