import React, { useState } from 'react';

const AdminPlans = () => {
  const [topupPlans, setTopupPlans] = useState([]);
  const [fixedPlans, setFixedPlans] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '', // Added field for Plan Name
    pricePerLiter: '',
    totalLiters: '',
    price: '',
    validity: '',
  });
  const [editing, setEditing] = useState(false);
  const [selectedPlanType, setSelectedPlanType] = useState('Topup');
  const [selectedValidity, setSelectedValidity] = useState('30');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateExpiryDate = (validity) => {
    const startDate = new Date();
    const expiryDate = new Date(startDate);
    expiryDate.setDate(startDate.getDate() + parseInt(validity));
    return expiryDate.toISOString().split('T')[0];
  };

  const planExists = (pricePerLiter, totalLiters, price, validity) => {
    const existsInTopup = topupPlans.some(
      (plan) =>
        plan.pricePerLiter === pricePerLiter &&
        plan.totalLiters === totalLiters
    );
    const existsInFixed = fixedPlans.some(
      (plan) =>
        plan.price === price &&
        plan.validity === validity &&
        plan.name === form.name // Check for Plan Name in Fixed Plans
    );

    if (existsInTopup) {
      alert('This exact plan already exists in Topup Plans!');
      return true;
    } else if (existsInFixed) {
      alert('This exact plan already exists in Fixed Plans!');
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the plan already exists only when creating, not when editing
    if (
      !editing &&
      planExists(
        form.pricePerLiter,
        form.totalLiters,
        form.price,
        selectedPlanType === 'Fixed' ? selectedValidity : form.validity
      )
    ) {
      return; // If exact plan exists, stop further execution
    }

    const newPlan = {
      ...form,
      id: editing ? form.id : Date.now(),
      validity: selectedPlanType === 'Fixed' ? selectedValidity : form.validity,
      expiry: selectedPlanType === 'Fixed' ? calculateExpiryDate(selectedValidity) : null,
    };

    if (editing) {
      if (selectedPlanType === 'Topup') {
        setTopupPlans(topupPlans.map((plan) => (plan.id === form.id ? newPlan : plan)));
      } else {
        setFixedPlans(fixedPlans.map((plan) => (plan.id === form.id ? newPlan : plan)));
      }
      alert('Plan updated successfully!');
      setEditing(false);
    } else {
      if (selectedPlanType === 'Topup') {
        setTopupPlans([...topupPlans, newPlan]);
      } else {
        setFixedPlans([...fixedPlans, newPlan]);
      }
      alert('Plan added successfully!');
    }

    setForm({ id: null, name: '', pricePerLiter: '', totalLiters: '', price: '', validity: '' });
  };

  const handleEdit = (id, type) => {
    if (type === 'Topup') {
      const planToEdit = topupPlans.find((plan) => plan.id === id);
      setForm(planToEdit);
      setEditing(true);
    } else {
      const planToEdit = fixedPlans.find((plan) => plan.id === id);
      setForm(planToEdit);
      setSelectedValidity(planToEdit.validity);
      setEditing(true);
    }
  };

  const handleDelete = (id, type) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      if (type === 'Topup') {
        setTopupPlans(topupPlans.filter((plan) => plan.id !== id));
      } else {
        setFixedPlans(fixedPlans.filter((plan) => plan.id !== id));
      }
      alert('Plan deleted successfully!');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#f4f6f8',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      gap: '30px',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#007bff',
      textAlign: 'center',
    },
    planTypeButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginBottom: '20px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'background-color 0.3s',
    },
    buttonActive: {
      backgroundColor: '#0056b3',
    },
    formContainer: {
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    input: {
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.3s',
    },
    select: {
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      fontSize: '1rem',
    },
    planList: {
      listStyleType: 'none',
      padding: '0',
      marginTop: '20px',
    },
    planItem: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    planTitle: {
      margin: '0',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px',
    },
    actions: {
      display: 'flex',
      gap: '10px',
      marginTop: '10px',
    },
    actionButton: {
      padding: '10px 15px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    editButton: {
      backgroundColor: '#ffc107',
      color: 'white',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      color: 'white',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Recharge Plans</h2>

      <div style={styles.planTypeButtons}>
        <button
          style={selectedPlanType === 'Topup' ? { ...styles.button, ...styles.buttonActive } : styles.button}
          onClick={() => {
            setSelectedPlanType('Topup');
            setEditing(false);
            setForm({ id: null, name: '', pricePerLiter: '', totalLiters: '', price: '', validity: '' });
          }}
        >
          Topup Plans
        </button>
        <button
          style={selectedPlanType === 'Fixed' ? { ...styles.button, ...styles.buttonActive } : styles.button}
          onClick={() => {
            setSelectedPlanType('Fixed');
            setEditing(false);
            setForm({ id: null, name: '', pricePerLiter: '', totalLiters: '', price: '', validity: '' });
          }}
        >
          Fixed Plans
        </button>
      </div>

      <div style={styles.formContainer}>
        <form style={styles.form} onSubmit={handleSubmit}>
          {selectedPlanType === 'Topup' ? (
            <>
              <input
                type="number"
                name="pricePerLiter"
                placeholder="Price per Liter"
                value={form.pricePerLiter}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="number"
                name="totalLiters"
                placeholder="Total Liters"
                value={form.totalLiters}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </>
          ) : (
            <>
              <input
                type="text" // Input for Plan Name
                name="name"
                placeholder="Plan Name"
                value={form.name} // Ensure value is linked to form state
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <select
                value={selectedValidity}
                onChange={(e) => setSelectedValidity(e.target.value)}
                required
                style={styles.select}
              >
                <option value="30">30 Days</option>
                <option value="60">60 Days</option>
                <option value="90">90 Days</option>
              </select>
            </>
          )}
          <button type="submit" style={styles.button}>
            {editing ? 'Update Plan' : 'Add Plan'}
          </button>
        </form>
      </div>

      {/* Fixed Plan List */}
      {selectedPlanType === 'Fixed' && fixedPlans.length > 0 && (
        <ul style={styles.planList}>
          {fixedPlans.map(plan => (
            <li key={plan.id} style={styles.planItem}>
              <p>Plan Name: {plan.name}</p> {/* Add this line for Plan Name */}
              <p>Price: Rs {plan.price}</p>
              <p>Validity: {plan.validity} days</p>
              <p>Expiry Date: {plan.expiry}</p> {/* Display expiry date if needed */}
              <div style={styles.actions}>
                <button
                  style={{ ...styles.actionButton, ...styles.editButton }}
                  onClick={() => handleEdit(plan.id, 'Fixed')}
                >
                  Edit
                </button>
                <button
                  style={{ ...styles.actionButton, ...styles.deleteButton }}
                  onClick={() => handleDelete(plan.id, 'Fixed')}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Topup Plan List */}
      {selectedPlanType === 'Topup' && topupPlans.length > 0 && (
        <ul style={styles.planList}>
          {topupPlans.map(plan => (
            <li key={plan.id} style={styles.planItem}>
              <p>Price per Liter: Rs {plan.pricePerLiter}</p>
              <p>Total Liters: {plan.totalLiters}</p>
              <div style={styles.actions}>
                <button
                  style={{ ...styles.actionButton, ...styles.editButton }}
                  onClick={() => handleEdit(plan.id, 'Topup')}
                >
                  Edit
                </button>
                <button
                  style={{ ...styles.actionButton, ...styles.deleteButton }}
                  onClick={() => handleDelete(plan.id, 'Topup')}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPlans;
