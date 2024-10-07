import axios from 'axios';

export const loginApi = async (credentials) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
    return response.data;
};

export const verifyOTP = async (email, otp) => {
    const response = await axios.post('http://localhost:5000/api/otp/verify-otp', { email, otp });
    return response.data;
};
