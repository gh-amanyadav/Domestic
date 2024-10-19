import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { useSelector } from 'react-redux';
import { getallCustomer } from '../../services/customerService';

const styles = {
    container: {
        width: '100%',
        maxWidth: '1300px',
        margin: '20px auto',
        background: '#fff',
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
        transition: 'background-color 0.3s',
    },
    returnButtonHover: {
        backgroundColor: '#0056b3',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '1.75rem',
    },
    searchBoxContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
    },
    searchBoxRow: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        width: '100%',
        maxWidth: '1000px',
    },
    searchBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    searchHeading: {
        marginBottom: '10px',
        fontWeight: 'bold',
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
        marginTop: '10px',
        fontSize: '1rem',
        transition: 'background-color 0.3s',
    },
    searchButtonHover: {
        backgroundColor: '#0056b3',
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
        padding: '10px',
        textAlign: 'center',
        backgroundColor: '#f4f4f4',
    },
    tableTd: {
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
        transition: 'background-color 0.3s',
    },
    downloadButtonHover: {
        backgroundColor: '#005700',
    },
    '@media (max-width: 768px)': {
        container: {
            padding: '15px',
            margin: '10px',
        },
        searchBoxRow: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        searchInput: {
            marginBottom: '10px',
        },
        searchButton: {
            width: '100%',
            marginLeft: 0,
        },
    },
    '@media (max-width: 480px)': {
        header: {
            fontSize: '1.5rem',
        },
        searchInput: {
            fontSize: '0.875rem',
            padding: '8px',
        },
        searchButton: {
            fontSize: '0.875rem',
            padding: '8px',
            margin: '10px 0 0 0',
        },
    },
};

const SuperAdminCustomerInfo = () => {
    const [data, setData] = useState([]);
    const [searchValues, setSearchValues] = useState({
        organization: '',
        customer: '',
    });

    const { token } = useSelector(state => state.auth);

    // Define search fields dynamically
    const searchFields = [
        { label: 'Organization Search', name: 'organization', placeholder: 'Search by Organization Name' },
        { label: 'Customer Search', name: 'customer', placeholder: 'Search by Customer Name' },
    ];

    // Fetch customer data from your API
    const fetchData = async () => {
        try {
            const response = await getallCustomer(token);
            setData(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Handle dynamic search
    const handleSearch = (searchType) => {
        console.log(`${searchType} Search for:`, searchValues[searchType]);
        // Implement actual search logic here for each searchType
    };

    // Handle input change dynamically
    const handleInputChange = (e, searchType) => {
        setSearchValues(prevValues => ({
            ...prevValues,
            [searchType]: e.target.value,
        }));
    };

    const handleDownload = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'customers_report.xlsx');
    };

    const redirectToDashboard = () => {
        window.location.href = '/superadmin';
    };

    return (
        <div style={styles.container}>
            <div style={styles.returnBox}>
                <button
                    style={styles.returnButton}
                    onClick={redirectToDashboard}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.returnButtonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.returnButton.backgroundColor}
                >
                    Return
                </button>
            </div>
            <h1 style={styles.header}>Customer Information</h1>
            
            <div style={styles.searchBoxContainer}>
                <div style={styles.searchBoxRow}>
                    {/* Dynamically render search fields */}
                    {searchFields.map((field) => (
                        <div style={styles.searchBox} key={field.name}>
                            <p style={styles.searchHeading}>{field.label}</p>
                            <input
                                type="text"
                                placeholder={field.placeholder}
                                value={searchValues[field.name]}
                                onChange={(e) => handleInputChange(e, field.name)}
                                style={styles.searchInput}
                            />
                            <button
                                style={styles.searchButton}
                                onClick={() => handleSearch(field.name)}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.searchButtonHover.backgroundColor}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.searchButton.backgroundColor}
                            >
                                Search
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table} id="customerTable">
                    <thead>
                        <tr>
                            <th style={styles.tableTh}>S.No</th>
                            <th style={styles.tableTh}>Customer Name</th>
                            <th style={styles.tableTh}>Email</th>
                            <th style={styles.tableTh}>Phone</th>
                            <th style={styles.tableTh}>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((row, index) => (
                                <tr key={index}>
                                    <td style={styles.tableTd}>{index + 1}</td>
                                    <td style={styles.tableTd}>{row.username}</td>
                                    <td style={styles.tableTd}>{row.email}</td>
                                    <td style={styles.tableTd}>{row.phoneNo}</td>
                                    <td style={styles.tableTd}>{row.location}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={styles.emptyRow}>No data available</td>
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
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.downloadButtonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.downloadButton.backgroundColor}
                >
                    Download
                </button>
            </div>
        </div>
    );
};

export default SuperAdminCustomerInfo;
