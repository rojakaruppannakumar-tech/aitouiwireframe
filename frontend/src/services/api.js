import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const analyzeWireframe = async (imageFile) => {
  const formData = new FormData();
  formData.append('wireframe', imageFile);

  const response = await apiClient.post('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const fetchProjects = async () => {
  const response = await apiClient.get('/projects');
  return response.data;
};

export const saveProject = async (projectData) => {
  const response = await apiClient.post('/projects', projectData);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await apiClient.delete(`/projects/${id}`);
  return response.data;
};