import React, { useEffect, useState } from 'react';
import SuperAdminNavbar from '../Navbar/Superadmin-Navbar';
import DeviceTable from '../DeviceTable';
import { getAllDevices } from '../../services/deviceService';
import GraphsComponent from '../Dashboard/SuperAdminGraph'; // Importing the SuperAdminGraph

const SuperAdminDashboard = () => {
    const [deviceData, setDeviceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State to track search query

    const token = localStorage.getItem('token');

    // Sample data for graphs (replace with real data later)
    const adminCount = 10; // Display as number, not a graph
    const customerCount = 50; // Display as number, not a graph

    const adminGrowthData = {
        labels: ['January', 'February', 'March'],
        datasets: [{ label: 'Admin Growth', data: [3, 6, 10], borderColor: 'rgba(75, 192, 192, 0.6)', fill: false }]
    };

    const customerGrowthData = {
        labels: ['January', 'February', 'March'],
        datasets: [{ label: 'Customer Growth', data: [20, 30, 50], borderColor: 'rgba(153, 102, 255, 0.6)', fill: false }]
    };

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

    // Dynamic search functionality to filter device/organization data
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Safely filter device data based on organization name
    const filteredData = deviceData.filter(
        (device) => device?.organizationName && device.organizationName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <SuperAdminNavbar />
            <main style={styles.mainContent}>
                {/* Search box for filtering organizations */}
                <div style={styles.searchContainer}>
                    <h2>Search Organization</h2>
                    <input
                        type="text"
                        placeholder="Search by Organization Name..."
                        value={searchQuery}
                        onChange={handleSearch}
                        style={styles.searchBox}
                    />
                </div>
                
                {/* Graphs displaying admin and customer counts and growth */}
                <GraphsComponent 
                    adminCount={adminCount} 
                    customerCount={customerCount} 
                    adminGrowthData={adminGrowthData} 
                    customerGrowthData={customerGrowthData} 
                />

                {/* Uncomment this if you want to display the filtered device data */}
                {/* <div style={styles.container}>
                    <h2 style={styles.pageHeading}>Device Information</h2>
                    <DeviceTable data={filteredData} />
                </div> */}
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
    searchContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '2rem',
    },
    searchBox: {
        width: '100%',
        maxWidth: '400px',
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        borderRadius: '0.5rem',
        border: '1px solid #ccc',
        marginTop: '1rem',
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

export default SuperAdminDashboard;
