// Profile.jsx

import React, { useState } from 'react';

const Profile = () => {
    // State variables for profile fields
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State variables for handling submission and errors
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Handle form submission for updating profile
    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        // Validate form fields
        const validationErrors = {};
        if (!username.trim()) validationErrors.username = 'Username is required.';
        if (!email.trim()) {
            validationErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validationErrors.email = 'Email is invalid.';
        }
        if (password && password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }

        // Prepare form data
        const formData = {
            username,
            email,
            ...(password && { password }), // Include password only if it's provided
        };

        try {
            const res = await fetch('/api/user/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success) {
                alert('Profile updated successfully!');
                // Optionally, reset the password field
                setPassword('');
            } else {
                throw new Error(data.message || 'Update failed');
            }
        } catch (error) {
            alert(error.message || 'Something went wrong!');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle profile deletion
    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete your profile? This action cannot be undone.'
        );
        if (!confirmDelete) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/user/delete', {
                method: 'DELETE',
            });

            const data = await res.json();
            if (data.success) {
                alert('Profile deleted successfully!');
                // Redirect to homepage or login after deletion
                window.location.href = '/';
            } else {
                throw new Error(data.message || 'Deletion failed');
            }
        } catch (error) {
            alert(error.message || 'Something went wrong!');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Styles object
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#F4F4F4',
            padding: '1rem',
        },
        card: {
            padding: '2rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '500px',
            boxSizing: 'border-box',
        },
        title: {
            fontSize: '1.875rem',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#1F2937',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%',
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#333333',
        },
        input: {
            backgroundColor: '#F9FAFB',
            borderRadius: '0.5rem',
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            border: '1px solid #D1D5DB',
            transition: 'border-color 0.3s ease',
            boxSizing: 'border-box',
        },
        inputError: {
            borderColor: '#E74C3C',
        },
        errorMessage: {
            color: '#E74C3C',
            marginTop: '0.25rem',
            fontSize: '0.875rem',
        },
        submitButton: {
            backgroundColor: '#1F2937',
            color: '#FFFFFF',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            cursor: 'pointer',
            border: 'none',
            transition: 'background-color 0.2s ease, transform 0.2s ease',
        },
        submitButtonHover: {
            backgroundColor: '#374151',
        },
        submitButtonActive: {
            transform: 'scale(0.98)',
        },
        profileActions: {
            marginTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: '1rem',
        },
        deleteButton: {
            backgroundColor: '#E53E3E',
            color: '#FFFFFF',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            border: 'none',
            transition: 'background-color 0.2s ease, transform 0.2s ease',
        },
        deleteButtonHover: {
            backgroundColor: '#C53030',
        },
        deleteButtonActive: {
            transform: 'scale(0.98)',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>User Profile</h1>
                <form style={styles.form} onSubmit={handleUpdate}>
                    {/* Username Field */}
                    <div style={styles.formGroup}>
                        <label htmlFor="username" style={styles.label}>
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            style={{
                                ...styles.input,
                                ...(errors.username ? styles.inputError : {}),
                            }}
                            placeholder={localStorage.getItem('username')}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {errors.username && (
                            <div style={styles.errorMessage}>{errors.username}</div>
                        )}
                    </div>

                    {/* Email Field */}
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            style={{
                                ...styles.input,
                                ...(errors.email ? styles.inputError : {}),
                            }}
                            placeholder={localStorage.getItem('email')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && (
                            <div style={styles.errorMessage}>{errors.email}</div>
                        )}
                    </div>

                    {/* Password Field */}
                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            style={{
                                ...styles.input,
                                ...(errors.password ? styles.inputError : {}),
                            }}
                            placeholder="Enter a new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                            <div style={styles.errorMessage}>{errors.password}</div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        style={styles.submitButton}
                        disabled={isSubmitting}
                        onMouseEnter={(e) =>
                        (e.target.style.backgroundColor =
                            styles.submitButtonHover.backgroundColor)
                        }
                        onMouseLeave={(e) =>
                        (e.target.style.backgroundColor =
                            styles.submitButton.backgroundColor)
                        }
                        onMouseDown={(e) =>
                            (e.target.style.transform = styles.submitButtonActive.transform)
                        }
                        onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                        onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                    >
                        {isSubmitting ? 'Updating...' : 'Update'}
                    </button>
                </form>

                {/* Profile Actions */}
                <div style={styles.profileActions}>
                    <button
                        style={styles.deleteButton}
                        onClick={handleDelete}
                        disabled={isSubmitting}
                        onMouseEnter={(e) =>
                        (e.target.style.backgroundColor =
                            styles.deleteButtonHover.backgroundColor)
                        }
                        onMouseLeave={(e) =>
                        (e.target.style.backgroundColor =
                            styles.deleteButton.backgroundColor)
                        }
                        onMouseDown={(e) =>
                            (e.target.style.transform = styles.deleteButtonActive.transform)
                        }
                        onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                        onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                    >
                        {isSubmitting ? 'Deleting...' : 'Delete Profile'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
