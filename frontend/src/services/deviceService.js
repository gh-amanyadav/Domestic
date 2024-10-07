import axios from 'axios';

export const getDeviceInfo = async (token) => {
    const response = await axios.get('http://localhost:5000/api/customer/getdeviceInfo', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const getAllDevices = async (token) => {
    const response = await axios.get('http://localhost:5000/api/device/getAllDeviceInfo', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
