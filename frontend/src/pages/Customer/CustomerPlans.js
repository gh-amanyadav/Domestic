import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const CustomerPlans = () => {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch plans from a server or pre-defined list for the customer
  useEffect(() => {
    const fetchPlans = async () => {
      const availablePlans = [
        { id: 1, name: 'Basic Plan', price: 299, validity: 30, expiry: '2024-11-15' },
        { id: 2, name: 'Standard Plan', price: 499, validity: 60, expiry: '2024-12-15' },
        { id: 3, name: 'Premium Plan', price: 799, validity: 84, expiry: '2025-01-15' }
      ];
      setPlans(availablePlans);
    };

    fetchPlans();
  }, []);

  // Handle button click and redirect to the Recharge page
  const handleRechargeClick = (planId) => {
    navigate(`/Recharge/${planId}`); // Redirect with the plan ID to the Recharge page
  };

  const styles = {
    container: {
      padding: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#f4f6f8',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#007bff',
      textAlign: 'center',
      borderBottom: '2px solid #007bff',
      paddingBottom: '10px',
    },
    planList: {
      listStyleType: 'none',
      padding: '0',
      marginTop: '20px',
    },
    planItem: {
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'space-between', // Add space between plan details and the button
      alignItems: 'center',
    },
    planTitle: {
      margin: '0',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px',
    },
    planDetails: {
      fontSize: '1rem',
      color: '#555',
    },
    rechargeButton: {
      padding: '10px 20px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
    },
    buttonHover: {
      backgroundColor: '#218838',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Recharge Plans</h2>
      {plans.length > 0 ? (
        <ul style={styles.planList}>
          {plans.map(plan => (
            <li key={plan.id} style={styles.planItem}>
              <div>
                <h3 style={styles.planTitle}>{plan.name} - Rs {plan.price}</h3>
                <div style={styles.planDetails}>
                  <p>Validity: {plan.validity} days</p>
                  <p>Expires on: {plan.expiry}</p>
                </div>
              </div>
              {/* Recharge Now button */}
              <button
                style={styles.rechargeButton}
                onClick={() => handleRechargeClick(plan.id)}
              >
                Recharge Now
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recharge plans are available at the moment.</p>
      )}
    </div>
  );
};

export default CustomerPlans;
