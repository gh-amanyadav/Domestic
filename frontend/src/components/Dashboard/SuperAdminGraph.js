import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
    Legend
);

const SuperAdminGraph = ({ adminCount, customerCount, adminGrowthData, customerGrowthData }) => {
    const lineChartOptions = {
        responsive: true,
        scales: {
            x: { 
                type: 'time',
                time: { unit: 'month' } 
            },
            y: { beginAtZero: true }
        }
    };

    return (
        <div style={styles.graphContainer}>
            <div style={styles.infoBox}>
                <h3>Total Admins</h3>
                <p style={styles.number}>{adminCount}</p> {/* Display the number */}
            </div>
            <div style={styles.infoBox}>
                <h3>Total Customers</h3>
                <p style={styles.number}>{customerCount}</p> {/* Display the number */}
            </div>
            <div style={styles.graphItem}>
                <h3>Admin's Growth Over Time</h3>
                <Line data={adminGrowthData} options={lineChartOptions} />
            </div>
            <div style={styles.graphItem}>
                <h3>Customer's Growth Over Time</h3>
                <Line data={customerGrowthData} options={lineChartOptions} />
            </div>
        </div>
    );
};

const styles = {
    graphContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2rem',
        width: '100%',
        margin: '2rem 0',
    },
    infoBox: {
        padding: '1rem',
        backgroundColor: '#fff',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    number: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#333',
    },
    graphItem: {
        padding: '1rem',
        backgroundColor: '#fff',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    // Responsive adjustments
    '@media (max-width: 1200px)': {
        graphContainer: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
    },
    '@media (max-width: 768px)': {
        graphContainer: {
            gridTemplateColumns: '1fr', // Stack everything on smaller screens
        },
    },
};

export default SuperAdminGraph;
