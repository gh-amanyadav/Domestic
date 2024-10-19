import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../Navbar/Admin-Navbar'; // Navbar component
import { getAllDevices, deleteDevice } from '../../services/deviceService';
import * as XLSX from 'xlsx';

const AdminDashboard = () => {
    const [deviceData, setDeviceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // New state for filtered data
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error handling
    const [searchQuery, setSearchQuery] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchDeviceData();
    }, [token]);

    useEffect(() => {
        // Filter deviceData whenever searchQuery changes
        const filtered = deviceData.filter(device =>
            device.user_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            device.device_plan.toLowerCase().includes(searchQuery.toLowerCase()) ||
            device.phone_no.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery, deviceData]);

    const fetchDeviceData = async () => {
        try {
            setLoading(true);
            const data = await getAllDevices(token);
            setDeviceData(data);
            setFilteredData(data); // Initialize filteredData with all devices
        } catch (err) {
            setError(err.message || 'An error occurred while fetching device data');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData); // Download filtered data
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
                    <div style={styles.headerContainer}>
                        <Link to="/admin/createDevice" style={styles.addDeviceButton}>
                            Create Device
                        </Link>
                        <h2 style={styles.pageHeading}>Device Information</h2>
                        <div style={styles.searchContainer}>
                            <input
                                type="text"
                                placeholder="Search"
                                style={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} // Update search query dynamically
                            />
                        </div>
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
                                {filteredData.length > 0 ? (
                                    filteredData.map((device, index) => (
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
    headerContainer: {
        display: 'flex',
        justifyContent: 'center', // Center the items
        alignItems: 'center', // Center items vertically
        width: '100%', // Take full width
        marginBottom: '20px',
    },
    pageHeading: {
        fontSize: '1.8rem',
        color: '#333',
        fontWeight: 'bold',
        margin: '0 20px', // Add margin to center spacing
        textAlign: 'center',
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        maxWidth: '300px', // Limit the width of the search box
    },
    searchInput: {
        padding: '10px',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    addDeviceButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px',
        fontWeight: 'bold',
        marginRight: '20px', // Add space between button and heading
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
