import axios from 'axios';

export const getAllAdmin = async (token) => {
    const response = await axios.get('http://localhost:5000/api/admin/getAllAdmin', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
