import axios from 'axios';

export const getallCustomer = async (token) => {
    const response = await axios.get('http://localhost:5000/api/customer/getallCustomer', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};