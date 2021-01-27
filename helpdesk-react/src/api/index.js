import axios from 'axios'
import { URLS } from "../constants/urls";

const API = axios.create({baseURL: URLS.axiosBaseURL});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer: ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

//Categories
export const getMainCategories = () => API.get('/categories');
export const createCategory = (formData) => API.post('/categories', formData);
export const updateCategory = (id, formData) => API.put(`/categories/${id}`, formData);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);

//Statuses
export const getStatuses = () => API.get('/statuses');
export const createStatus = (formData) => API.post('/statuses', formData);
export const updateStatus = (id, formData) => API.put(`/statuses/${id}`, formData);
export const deleteStatus = (id) => API.delete(`/statuses/${id}`);

//Priorities
export const getPriorities = () => API.get('/priority');
export const createPriority = (formData) => API.post('/priority', formData);
export const updatePriority = (id, formData) => API.put(`/priority/${id}`, formData);

//User
export const getUser = (id) => API.get(`/user/${id}`);
export const getUsers = (page, limit, search) => API.get(`/user?page=${page}&limit=${limit}&search=${search}`);
export const createUser = (formData) => API.post('/user', formData);
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const getUserRoles = () => API.get('/userroles');

//Auths
export const singIn = (formData) => API.post('/auth/singin', formData);
export const singUp = (formData) => API.post('/auth/signup', formData);

//upload draft image
export const draftImageUpload = (formData) =>  API.post('/ticket/uploaddraftimage', formData);

//ticket
export const createTicket = (formData) => API.post('/ticket', formData);
export const getTickets = () => API.get('/ticket');
