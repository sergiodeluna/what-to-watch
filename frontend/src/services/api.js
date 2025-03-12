import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // URL do backend
});

export const getUsers = () => api.get('/users');
export const getUser = (id) => api.get(`/users/${id}`);
export const createUser = (user) => api.post('/users', user);
export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export const getFamilies = () => api.get('/families');
export const getFamily = (id) => api.get(`/families/${id}`);
export const createFamily = (family) => api.post('/families', family);
export const updateFamily = (id, family) => api.put(`/families/${id}`, family);
export const deleteFamily = (id) => api.delete(`/families/${id}`);
export const addUsersToFamily = (familyId, userIds) => api.post(`/families/${familyId}/add-users`, userIds);
export const removeUsersFromFamily = (familyId, userIds) => api.post(`/families/${familyId}/remove-users`, userIds);

export const getVisualMedia = () => api.get('/visual-media');
export const getVisualMediaById = (id) => api.get(`/visual-media/${id}`);
export const createVisualMedia = (visualMedia) => api.post('/visual-media', visualMedia);
export const updateVisualMedia = (id, visualMedia) => api.put(`/visual-media/${id}`, visualMedia);
export const deleteVisualMedia = (id) => api.delete(`/visual-media/${id}`); 