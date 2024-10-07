import React, { useEffect, useState } from 'react';
import AdminNavbar from '../Navbar/Admin-Navbar'; // Navbar component
import DeviceTable from '../DeviceTable'; // New component for device table
import { getAllDevices } from '../../services/deviceService';

const AdminDashboard = () => {
    const [deviceData, setDeviceData] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error handling
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchDeviceData = async () => {
            try {
                setLoading(true);
                const data = await getAllDevices(token);
                console.log(data);
                setDeviceData(data);
            } catch (err) {
                setError(err.message || 'An error occurred while fetching device data');
            } finally {
                setLoading(false);
            }
        };

        fetchDeviceData();
    }, [token]);

    if (loading) {
        return <div>Loading...</div>; // Show loading message
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message if fetch fails
    }

    return (
        <div>
            <AdminNavbar /> {/* Reusing the navbar */}
            <main style={styles.mainContent}>
                <div style={styles.container}>
                    <h2 style={styles.pageHeading}>Device Information</h2>
                    {/* Passing fetched data to DeviceTable component */}
                    <DeviceTable data={deviceData} />
                </div>
            </main>
        </div>
    );
};

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
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '90%',
        margin: '0 auto',
        backgroundColor: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '0.75rem',
        padding: '2rem',
    },
    pageHeading: {
        fontSize: '1.8rem',
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '2rem',
    },
};

export default AdminDashboard;
