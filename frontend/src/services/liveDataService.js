import axios from 'axios';

export const getLiveData = async (token) => {
    const response = await axios.get('http://localhost:5000/api/customer/getLivedata', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const getAllLiveData = async (token) => {
    const response = await axios.get('http://localhost:5000/api/liveData/getAllLivedata', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
