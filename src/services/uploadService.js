import api from './api';

export const uploadService = {
  uploadImage: async (file) => {
    try {
      console.log('📤 Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
      
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 seconds for large files
      });
      
      console.log('✅ Upload successful:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Upload failed:');
      
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received');
      } else {
        console.error('Error message:', error.message);
      }
      
      throw error;
    }
  },
  
  getImageUrl: (fileName) => {
    return `http://localhost:8080/api/uploads/${fileName}`;
  }
};

export default uploadService;