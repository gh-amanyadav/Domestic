import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../Navbar/Admin-Navbar'; // Navbar component
import { getAllDevices, deleteDevice } from '../../services/deviceService';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const AdminDashboard = () => {
    const [deviceData, setDeviceData] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error handling
    const [searchQuery, setSearchQuery] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchDeviceData();
    }, [token]);

    const fetchDeviceData = async () => {
        try {
            setLoading(true);
            const data = await getAllDevices(token);
            setDeviceData(data);
        } catch (err) {
            setError(err.message || 'An error occurred while fetching device data');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        console.log('Search for:', searchQuery);
        // Implement search functionality as needed
    };

    const handleDownload = () => {
        const ws = XLSX.utils.json_to_sheet(deviceData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'devices_report.xlsx');
    };

    const handleEdit = (deviceId) => {
        // Navigate to edit device page
        window.location.href = `/admin/updateDevice/${deviceId}`;
    };

    const handleDelete = async (deviceId) => {
        if (window.confirm('Are you sure you want to delete this device?')) {
            try {
                await deleteDevice(token, deviceId);
                fetchDeviceData(); // Refresh the device list
            } catch (error) {
                console.error('Error deleting device:', error);
            }
        }
    };

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
                    <div style={styles.addDeviceContainer}>
                        <Link to="/admin/createDevice" style={styles.addDeviceButton}>
                            Create Device
                        </Link>
                    </div>
                    <div style={styles.tableContainer}>
                        <table style={styles.table} id="deviceTable">
                            <thead>
                                <tr>
                                    <th style={styles.tableTh}>S.No</th>
                                    <th style={styles.tableTh}>User ID</th>
                                    <th style={styles.tableTh}>Device Plan</th>
                                    <th style={styles.tableTh}>Phone Number</th>
                                    <th style={styles.tableTh}>Expiry</th>
                                    <th style={styles.tableTh}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deviceData.length > 0 ? (
                                    deviceData.map((device, index) => (
                                        <tr key={index}>
                                            <td style={styles.tableTd}>{index + 1}</td>
                                            <td style={styles.tableTd}>{device.user_id}</td>
                                            <td style={styles.tableTd}>{device.device_plan}</td>
                                            <td style={styles.tableTd}>{device.phone_no}</td>
                                            <td style={styles.tableTd}>{new Date(device.expiry).toLocaleDateString()}</td>
                                            <td style={styles.tableTd}>
                                                <button
                                                    onClick={() => handleEdit(device._id)}
                                                    style={styles.editButton}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(device._id)}
                                                    style={styles.deleteButton}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={styles.emptyRow}>No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div style={styles.downloadContainer}>
                        <button
                            id="downloadButton"
                            onClick={handleDownload}
                            style={styles.downloadButton}
                        >
                            Download
                        </button>
                    </div>
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
    searchBox: {
        marginBottom: '20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    searchInput: {
        padding: '10px',
        width: '100%',
        maxWidth: '300px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    searchButton: {
        padding: '10px 20px',
        border: 'none',
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '10px',
        fontSize: '1rem',
        transition: 'background-color 0.3s',
    },
    addDeviceContainer: {
        marginBottom: '20px',
        textAlign: 'right',
    },
    addDeviceButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px',
        fontWeight: 'bold',
    },
    tableContainer: {
        overflowX: 'auto',
        margin: '0 auto',
        padding: '0 10px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableTh: {
        border: '1px solid #ddd',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#007BFF',
        fontWeight: 'bold',
        fontSize: '20px',
    },
    tableTd: {
        border: '1px solid #ddd',
        padding: '15px',
        textAlign: 'center',
        fontSize: '18px',
    },
    emptyRow: {
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#999',
    },
    downloadContainer: {
        textAlign: 'center',
        marginTop: '20px',
    },
    downloadButton: {
        backgroundColor: '#008000',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    editButton: {
        padding: '5px 10px',
        backgroundColor: '#ffc107',
        color: 'black',
        border: 'none',
        borderRadius: '4px',
        marginRight: '5px',
        cursor: 'pointer',
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default AdminDashboard;
