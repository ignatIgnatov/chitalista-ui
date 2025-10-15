import api from './api';

export const articlesService = {
  getAll: () => {
    console.log('Fetching all articles...');
    return api.get('/articles');
  },

  getById: (id) => {
    console.log('Fetching article by ID:', id);
    return api.get(`/articles/${id}`);
  },

  create: (articleData) => {
    console.log('Creating article:', articleData);
    return api.post('/articles', articleData);
  },
  
  update: (id, articleData) => api.put(`/articles/${id}`, articleData),
  
  delete: (id) => api.delete(`/articles/${id}`),
  
  search: (filters) => {
    console.log('Searching articles with filters:', filters);
    return api.get('/articles/search', { params: filters });
  },
  
  getByTemplate: (template) => api.get(`/articles/template/${template}`)
};

export default articlesService;