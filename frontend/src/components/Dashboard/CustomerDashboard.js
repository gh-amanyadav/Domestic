import React, { useEffect, useState } from 'react';
import { getDeviceInfo } from '../../services/deviceService';// Import the deviceService for API calls
import CustomerNavbar  from '../Navbar/Customer-Navbar';
import { useSelector } from 'react-redux'; // Assuming you're using redux for auth state

const styles = {
    mainContent: {
        marginLeft: 0,
        padding: '2rem',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        paddingTop: '7rem',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '90%',
        margin: '0 auto',
        backgroundColor: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '0.75rem',
        padding: '2rem',
        overflowX: 'auto',
    },
    infoWrapper: {
        width: '98%',
        textAlign: 'center',
    },
    infoBox: {
        width: '98%',
        backgroundColor: '#f1f1f1',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '0 auto',
    },
    infoBoxHeading: {
        marginBottom: '1rem',
        fontSize: '1.8rem',
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    responsiveTableWrapper: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'center',
        fontSize: '1rem',
        color: '#333',
    },
    tableHeaderCell: {
        padding: '0.75rem',
        border: '1px solid #ddd',
        backgroundColor: '#007BFF',
        color: 'white',
        fontWeight: 'bold',
    },
    tableCell: {
        padding: '0.75rem',
        border: '1px solid #ddd',
    },
    evenRow: {
        backgroundColor: '#f9f9f9',
    },
    oddRow: {
        backgroundColor: '#fff',
    },
};

const Customerdashboard = () => {
    const [deviceData, setDeviceData] = useState([]);
    const [error, setError] = useState('');
    const token = useSelector((state) => state.auth.token); // Access the token from Redux store

    useEffect(() => {
        const fetchDeviceInfo = async () => {
            try {
                const devices = await getDeviceInfo(token); // Use deviceService to fetch device data
                setDeviceData(devices);
            } catch (err) {
                setError('Failed to fetch device data. Please try again later.');
                console.error(err);
            }
        };

        fetchDeviceInfo(); // Fetch device info when the component mounts
    }, [token]);

    return (
        <div>
            <CustomerNavbar /> Add the CustomerNavbar here
            <div style={styles.mainContent}>
                <div style={styles.container}>
                    <div style={styles.infoWrapper}>
                        <div style={styles.infoBox}>
                            <h2 style={styles.infoBoxHeading}>Device Information</h2>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div style={styles.responsiveTableWrapper}>
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={styles.tableHeaderCell}>S.NO</th>
                                            <th style={styles.tableHeaderCell}>Devices</th>
                                            <th style={styles.tableHeaderCell}>Plans</th>
                                            <th style={styles.tableHeaderCell}>Expiry</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deviceData.length > 0 ? (
                                            deviceData.map((device, index) => (
                                                <tr key={device._id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                                                    <td style={styles.tableCell}>{index + 1}</td>
                                                    <td style={styles.tableCell}>{device._id.slice(-5)}</td>
                                                    <td style={styles.tableCell}>{device.device_plan}</td>
                                                    <td style={styles.tableCell}>{new Date(device.expiry).toLocaleDateString()}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" style={styles.tableCell}>No device data available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customerdashboard;
