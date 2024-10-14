import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getallCustomer = async (token) => {
    
    try {
        const response = await axios.get(`${API_BASE_URL}/customer/getallCustomer`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createCustomer = async (token, customerData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/customer/createCustomer`, customerData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getCustomer = async (token, customerId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/customer/getCustomerById/${customerId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateCustomer = async (token, customerId, customerData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/customer/updateCustomer/${customerId}`, customerData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteCustomer = async (token, customerId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/customer/deleteCustomer/${customerId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
