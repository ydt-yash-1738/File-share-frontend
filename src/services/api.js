import axios from 'axios';

const API_URL = 'https://file-share-backend-x6yn.onrender.com/api/files'; 

export const uploadFile = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/upload`, data, {
            headers: { 'Content-Type': 'multipart/form-data' } 
        });
        return response.data;
    } catch (error) {
        console.error('Error with calling the API:', error.message);
    }
};
