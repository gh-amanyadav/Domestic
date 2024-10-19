import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllLiveData } from "../../services/liveDataService";

const AdminLiveData = () => {
    const [tableData, setTableData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        // Fetch data from your API
        const fetchData = async () => {
            try {
                const response = await getAllLiveData(token); // Replace with your API endpoint
                setTableData(response); // Adjust according to the structure of your API response
                setFilteredData(response); // Initialize filtered data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        filterTableData();
    }, [searchQuery]);

    const filterTableData = () => {
        let data = [...tableData];

        if (searchQuery) {
            data = data.filter((item) =>
                item.deviceId.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredData(data);
    };

    const styles = {
        outerContainer: {
            border: "2px solid black", // Black border around the container
            borderRadius: "0.5rem",
            padding: "1rem",
            margin: "0 auto",
            maxWidth: "1000px",
        },
        headerContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
        },
        title: {
            fontSize: "2rem",
            color: "#1F2937",
            textAlign: "center", // Center the title
            flexGrow: 1,
        },
        searchSection: {
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "1rem",
        },
        searchInput: {
            padding: "0.75rem",
            borderRadius: "0.5rem",
            border: "1px solid #D1D5DB",
        },
        searchButton: {
            padding: "0.75rem 1.5rem",
            backgroundColor: "#1F2937",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
        },
        tableHeader: {
            backgroundColor: "#F4F4F4",
            textAlign: "left",
            padding: "0.75rem",
            border: "1px solid #D1D5DB",
        },
        tableRow: {
            textAlign: "left",
            padding: "0.75rem",
            border: "1px solid #D1D5DB",
        },
        status: (status) => ({
            color: status === "Active" ? "green" : "red",
        }),
        downloadButton: {
            display: "block",
            margin: "1rem auto",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#1F2937",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
        },
        backButton: {
            marginRight: "1rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#000000",
            color: "#ffffff",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
        },
    };

    const handleBack = () => {
        window.history.back(); // Redirect to the previous page
    };

    return (
        <div style={styles.outerContainer}>
            <div style={styles.headerContainer}>
                <button style={styles.backButton} onClick={handleBack}>
                    Back
                </button>
                <h1 style={styles.title}>LIVE DATA</h1>
            </div>
            <div style={styles.searchSection}>
                <input
                    type="text"
                    placeholder="Search by Device ID"
                    style={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button style={styles.searchButton} onClick={filterTableData}>
                    Search
                </button>
            </div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>S.No</th>
                        <th style={styles.tableHeader}>Device ID</th>
                        <th style={styles.tableHeader}>Cost</th>
                        <th style={styles.tableHeader}>Liters Remaining</th>
                        <th style={styles.tableHeader}>Current Plan</th>
                        <th style={styles.tableHeader}>Total Liters</th>
                        <th style={styles.tableHeader}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, index) => (
                        <tr key={index}>
                            <td style={styles.tableRow}>{index + 1}</td>
                            <td style={styles.tableRow}>{row.device_id.slice(-5)}</td>
                            <td style={styles.tableRow}>{row.cost}</td>
                            <td style={styles.tableRow}>{row.liters_remaining}</td>
                            <td style={styles.tableRow}>{row.current_plan}</td>
                            <td style={styles.tableRow}>{row.total_liters}</td>
                            <td style={styles.tableRow}>
                                <span style={styles.status(row.status)}>{row.status}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button style={styles.downloadButton}>Download as Excel</button>
        </div>
    );
};

export default AdminLiveData;
