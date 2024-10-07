import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Recharge = () => {
    const [deviceId, setDeviceId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedLiters, setSelectedLiters] = useState('');
    const [totalCost, setTotalCost] = useState('Select liters to see cost');
    const [transactionDetails, setTransactionDetails] = useState('');
    const [errors, setErrors] = useState({});
    const [isHovering, setIsHovering] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false); // State to manage loading
    const navigate = useNavigate();

    const handleLitersChange = (event) => {
        const liters = event.target.value;
        setSelectedLiters(liters);

        if (liters) {
            const cost = liters; // 1 liter = 1 rs
            setTotalCost(`Total Cost: ${cost} Rs`);
        } else {
            setTotalCost('Select liters to see cost');
        }
    };

    const handlePhoneNumberChange = (event) => {
        const sanitizedPhoneNumber = event.target.value.replace(/\D/g, '');
        setPhoneNumber(sanitizedPhoneNumber);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!/^\d+$/.test(deviceId)) {
            newErrors.deviceId = 'Please enter a valid Device ID (only numbers).';
        }

        if (!/^\d{8,13}$/.test(phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid Phone Number (8-13 digits).';
        }

        if (!selectedLiters) {
            newErrors.selectedLiters = 'Please select the number of liters.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleTransactionClick = async () => {
        if (validateForm()) {
            setLoading(true);
            const cost = selectedLiters; // 1 liter = 1 rs
            try {
                const response = await fetch('YOUR_API_ENDPOINT', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        deviceId,
                        phoneNumber,
                        selectedLiters,
                        cost,
                    }),
                });

                if (response.ok) {
                    const result = await response.json();
                    setTransactionDetails(
                        `Transaction Successful!<br/>
            Device ID: ${deviceId}<br/>
            Phone Number: ${phoneNumber}<br/>
            Selected Liters: ${selectedLiters}<br/>
            Total Cost: ${cost} Rs`
                    );

                    // Redirect to Customer-dashboard after the transaction is processed
                    navigate('/Customer');
                } else {
                    const errorData = await response.json();
                    setTransactionDetails(`Transaction failed: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
                setTransactionDetails('An error occurred while processing the transaction.');
            } finally {
                setLoading(false);
            }
        }
    };

    const styles = {
        container: {
            width: '100%',
            maxWidth: '500px',
            padding: '2rem',
            backgroundColor: '#ffffff',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            margin: '2rem auto',
            fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        },
        title: {
            textAlign: 'center',
            fontSize: '2rem',
            color: '#333333',
            marginBottom: '1.5rem',
        },
        formGroup: {
            marginBottom: '1.25rem',
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#555555',
        },
        inputField: {
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid #cccccc',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            transition: 'border-color 0.3s ease',
            boxSizing: 'border-box',
        },
        selectBox: {
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid #cccccc',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            backgroundColor: '#ffffff',
            cursor: 'pointer',
            transition: 'border-color 0.3s ease',
            boxSizing: 'border-box',
        },
        inputFocus: {
            borderColor: '#4A90E2',
            outline: 'none',
        },
        totalCost: {
            marginTop: '1rem',
            fontSize: '1.1rem',
            padding: '0.75rem 1rem',
            border: '1px solid #cccccc',
            borderRadius: '0.5rem',
            backgroundColor: '#f9f9f9',
            color: '#333333',
            boxSizing: 'border-box',
        },
        transactionDetails: {
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#f0f4f8',
            borderRadius: '0.5rem',
            color: '#333333',
            fontSize: '1rem',
            boxSizing: 'border-box',
        },
        buttonContainer: {
            textAlign: 'center',
            marginTop: '1.5rem',
        },
        btn: {
            backgroundColor: isHovering ? (isActive ? '#2C5282' : '#357ABD') : '#4A90E2',
            color: '#ffffff',
            padding: '0.75rem 2rem',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            transform: isActive ? 'scale(0.98)' : 'scale(1)',
        },
        errorMessage: {
            color: '#E74C3C',
            marginTop: '0.5rem',
            fontSize: '0.9rem',
        },
        loadingMessage: {
            color: '#4A90E2',
            fontSize: '1rem',
            textAlign: 'center',
            marginTop: '1rem',
        },
        '@media (maxWidth: 600px)': {
            container: {
                padding: '1rem',
            },
            title: {
                fontSize: '1.5rem',
            },
            btn: {
                width: '100%',
                padding: '0.75rem',
            },
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Recharge</h1>
            <div style={styles.formGroup}>
                <label htmlFor="deviceId" style={styles.label}>
                    Device ID
                </label>
                <input
                    id="deviceId"
                    type="number"
                    style={{
                        ...styles.inputField,
                        ...(document.activeElement.id === 'deviceId' ? styles.inputFocus : {}),
                    }}
                    placeholder="Enter Device ID"
                    min="0"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                    required
                />
                {errors.deviceId && <div style={styles.errorMessage}>{errors.deviceId}</div>}
            </div>
            <div style={styles.formGroup}>
                <label htmlFor="phoneNumber" style={styles.label}>
                    Phone Number
                </label>
                <input
                    id="phoneNumber"
                    type="tel"
                    style={{
                        ...styles.inputField,
                        ...(document.activeElement.id === 'phoneNumber' ? styles.inputFocus : {}),
                    }}
                    placeholder="Enter Phone Number"
                    pattern="\d{8,13}"
                    title="Phone number should be between 8 and 13 digits"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    required
                />
                {errors.phoneNumber && <div style={styles.errorMessage}>{errors.phoneNumber}</div>}
            </div>
            <div style={styles.formGroup}>
                <label htmlFor="liters" style={styles.label}>
                    Select Liters
                </label>
                <select
                    id="liters"
                    style={{
                        ...styles.selectBox,
                        ...(document.activeElement.id === 'liters' ? styles.inputFocus : {}),
                    }}
                    value={selectedLiters}
                    onChange={handleLitersChange}
                >
                    <option value="" disabled>
                        Select liters
                    </option>
                    {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((liters) => (
                        <option key={liters} value={liters}>
                            {liters} Liters
                        </option>
                    ))}
                </select>
                {errors.selectedLiters && <div style={styles.errorMessage}>{errors.selectedLiters}</div>}
            </div>
            <div style={styles.formGroup}>
                <div style={styles.totalCost}>{totalCost}</div>
            </div>
            <div style={styles.buttonContainer}>
                <button
                    style={styles.btn}
                    onClick={handleTransactionClick}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onMouseDown={() => setIsActive(true)}
                    onMouseUp={() => setIsActive(false)}
                    onMouseOut={() => setIsActive(false)}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Processing...' : 'Transaction'}
                </button>
            </div>
            {transactionDetails && (
                <div
                    style={styles.transactionDetails}
                    dangerouslySetInnerHTML={{ __html: transactionDetails }}
                />
            )}
        </div>
    );
};

export default Recharge;
