import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Define your styles here
const styles = {
    body: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f4',
        margin: 0,
        padding: 0,
    },
    container: {
        width: '100%',
        maxWidth: '1300px',
        margin: '20px auto',
        backgroundColor: '#ffffff',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box',
        position: 'relative',
    },
    returnBox: {
        position: 'absolute',
        top: '10px',
        left: '10px',
    },
    returnButton: {
        padding: '10px 20px',
        border: 'none',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '1.75rem',
    },
    searchBox: {
        marginBottom: '20px',
        textAlign: 'center',
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
    th: {
        border: '1px solid #ddd',
        padding: '10px',
        textAlign: 'center',
        backgroundColor: '#f4f4f4',
    },
    td: {
        border: '1px solid #ddd',
        padding: '10px',
        textAlign: 'center',
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
    },
};

const Transaction = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    // Function to fetch transaction data from the API
    const fetchData = async () => {
        try {
            const response = await fetch('YOUR_API_ENDPOINT'); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result); // Assume result is an array of transactions
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error accordingly (e.g., show a notification or error message)
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data when component mounts
    }, []);

    const handleSearch = () => {
        const query = searchTerm.toLowerCase();
        console.log('Search for:', query);

        // Filter the fetched data based on the search term
        const filteredData = data.filter(row =>
            row.deviceId.toLowerCase().includes(query) ||
            row.emailid.toLowerCase().includes(query) ||
            row.txnid.toLowerCase().includes(query)
        );

        setData(filteredData);
    };

    const redirectToDashboard = () => {
        navigate('/customer'); // Update to the correct path
    };

    const handleDownload = () => {
        console.log('Download clicked');
        // Implement your download logic here
    };

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <div style={styles.returnBox}>
                    <button
                        style={styles.returnButton}
                        onClick={redirectToDashboard}
                    >
                        Return
                    </button>
                </div>
                <h1 style={styles.header}>Transactions</h1>
                <div style={styles.searchBox}>
                    <input
                        type="text"
                        id="searchBox"
                        placeholder="Search..."
                        style={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        id="searchButton"
                        style={styles.searchButton}
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>S.No</th>
                                <th style={styles.th}>DateTime</th>
                                <th style={styles.th}>Device ID</th>
                                <th style={styles.th}>Email ID</th>
                                <th style={styles.th}>Total Liters</th>
                                <th style={styles.th}>Total Cost</th>
                                <th style={styles.th}>TXN ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length ? (
                                data.map((row, index) => (
                                    <tr key={index}>
                                        <td style={styles.td}>{index + 1}</td>
                                        <td style={styles.td}>{row.datetime}</td>
                                        <td style={styles.td}>{row.deviceId}</td>
                                        <td style={styles.td}>{row.emailid}</td>
                                        <td style={styles.td}>{row.totalliters}</td>
                                        <td style={styles.td}>{row.totalcost}</td>
                                        <td style={styles.td}>{row.txnid}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr style={styles.emptyRow}>
                                    <td colSpan="7">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div style={styles.downloadContainer}>
                    <button
                        style={styles.downloadButton}
                        onClick={handleDownload}
                    >
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Transaction;
