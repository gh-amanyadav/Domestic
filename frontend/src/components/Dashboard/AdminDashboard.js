import React, { useEffect, useState } from 'react';
import AdminNavbar from '../Navbar/Admin-Navbar'; // Navbar component
import DeviceTable from '../DeviceTable'; // New component for device table

const AdminDashboard = () => {
    const [deviceData, setDeviceData] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error handling

    useEffect(() => {
        const fetchDeviceData = async () => {
            try {
                setLoading(true); // Start loading
                const response = await fetch('http://localhost:5000/api/device/getAllDeviceInfo'); // Your API endpoint
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`); // Handle response errors
                }
                const data = await response.json();
                setDeviceData(data); // Assuming the API returns an array of devices
            } catch (err) {
                setError(err.message); // Catch any errors
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchDeviceData();
    }, []);

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
