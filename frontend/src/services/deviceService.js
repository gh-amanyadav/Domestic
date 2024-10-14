import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getDeviceInfo = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/customer/getdeviceInfo`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const getAllDevices = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/device/getAllDeviceInfo`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const getDeviceById = async (token, deviceId) => {
    console.log(deviceId);
    try {
        const response = await axios.get(`${API_BASE_URL}/device/getDeviceById/${deviceId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createDevice = async (token, deviceData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/device/add`, deviceData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateDevice = async (token, deviceId, deviceData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/device/updateDeviceInfo/${deviceId}`, deviceData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteDevice = async (token, deviceId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/device/deleteDeviceInfo/${deviceId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};