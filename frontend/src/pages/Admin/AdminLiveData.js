import React, { useState, useEffect } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { getAllLiveData } from "../../services/liveDataService";

const AdminLiveData = () => {
    const [tableData, setTableData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [yearly, setYearly] = useState("");
    const [monthly, setMonthly] = useState("");
    const [weekly, setWeekly] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        // Fetch data from your API
        const fetchData = async () => {
            try {
                const response = await getAllLiveData(token); // Replace with your API endpoint
                setTableData(response.data); // Adjust according to the structure of your API response
                setFilteredData(response.data); // Initialize filtered data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        filterTableData();
    }, [searchQuery, yearly, monthly, weekly]);

    const filterTableData = () => {
        let data = [...tableData];

        if (searchQuery) {
            data = data.filter((item) =>
                item.deviceId.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (yearly) {
            data = data.filter(
                (item) => moment(item.datetime).format("YYYY") === yearly.split("-")[0]
            );
        }

        if (monthly) {
            data = data.filter(
                (item) => moment(item.datetime).format("MMMM") === monthly
            );
        }

        if (weekly) {
            const weekNumber = parseInt(weekly.split(" ")[1], 10);
            data = data.filter((item) => {
                const dayOfMonth = moment(item.datetime).date();
                let calculatedWeekNumber;

                if (dayOfMonth >= 1 && dayOfMonth <= 7) {
                    calculatedWeekNumber = 1;
                } else if (dayOfMonth >= 8 && dayOfMonth <= 14) {
                    calculatedWeekNumber = 2;
                } else if (dayOfMonth >= 15 && dayOfMonth <= 21) {
                    calculatedWeekNumber = 3;
                } else if (dayOfMonth >= 22 && dayOfMonth <= 28) {
                    calculatedWeekNumber = 4;
                } else if (dayOfMonth >= 29) {
                    calculatedWeekNumber = 5;
                }

                return calculatedWeekNumber === weekNumber;
            });
        }

        setFilteredData(data);
    };

    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "1rem",
        },
        title: {
            fontSize: "2rem",
            color: "#1F2937",
            marginBottom: "1rem",
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
        searchSelect: {
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
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#1F2937",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>LIVE DATA</h1>
            <div style={styles.searchSection}>
                <input
                    type="text"
                    placeholder="Search by Device ID"
                    style={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    style={styles.searchSelect}
                    value={yearly}
                    onChange={(e) => setYearly(e.target.value)}
                >
                    <option value="" disabled selected>
                        Yearly
                    </option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                </select>
                <select
                    style={styles.searchSelect}
                    value={monthly}
                    onChange={(e) => setMonthly(e.target.value)}
                >
                    <option value="" disabled selected>
                        Monthly
                    </option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>
                <select
                    style={styles.searchSelect}
                    value={weekly}
                    onChange={(e) => setWeekly(e.target.value)}
                >
                    <option value="" disabled selected>
                        Weekly
                    </option>
                    <option value="Week 1">Week 1</option>
                    <option value="Week 2">Week 2</option>
                    <option value="Week 3">Week 3</option>
                    <option value="Week 4">Week 4</option>
                    <option value="Week 5">Week 5</option>
                </select>
                <button style={styles.searchButton} onClick={filterTableData}>
                    Search
                </button>
            </div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>S.No</th>
                        <th style={styles.tableHeader}>Device ID</th>
                        <th style={styles.tableHeader}>TDS</th>
                        <th style={styles.tableHeader}>Liters Remaining</th>
                        <th style={styles.tableHeader}>Current Plan</th>
                        <th style={styles.tableHeader}>Total Liters</th>
                        <th style={styles.tableHeader}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((row, index) => (
                            <tr key={index}>
                                <td style={styles.tableRow}>{index + 1}</td>
                                <td style={styles.tableRow}>{row.deviceId}</td>
                                <td style={styles.tableRow}>{row.tds}</td>
                                <td style={styles.tableRow}>{row.litersRemaining}</td>
                                <td style={styles.tableRow}>{row.currentPlan}</td>
                                <td style={styles.tableRow}>{row.totalLiters}</td>
                                <td style={styles.tableRow}>
                                    <span style={styles.status(row.status)}>{row.status}</span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button style={styles.downloadButton}>Download as Excel</button>
        </div>
    );
};

export default AdminLiveData;
