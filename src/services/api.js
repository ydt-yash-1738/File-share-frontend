// import axios from 'axios';

// const API_URL = 'https://file-share-backend-iha5.onrender.com'; 

// export const uploadFile = async (data) => {
//     try {
//         const response = await axios.post(`${API_URL}/upload`, data, {
//             headers: { 'Content-Type': 'multipart/form-data' } 
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error with calling the API:', error.message);
//     }
// };


import axios from 'axios';

const API_URL = 'https://file-share-backend-iha5.onrender.com';

export const uploadFile = async (data) => {
    try {
        console.log('Uploading file to:', `${API_URL}/api/files/upload`);
        console.log('File being uploaded:', data.get('file').name);
        
        const response = await axios.post(`${API_URL}/api/files/upload`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload progress: ${percentCompleted}%`);
            }
        });
        
        console.log('Upload response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error while uploading file:', error);
        if (error.response) {
            console.error('Server response:', error.response.data);
            return error.response.data;
        }
        return { error: 'Network error, please try again' };
    }
};

export const downloadFile = async (fileId) => {
    try {
        const response = await axios.get(`${API_URL}/api/files/file/${fileId}`, {
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        console.error('Error while downloading file:', error);
        return null;
    }
};
