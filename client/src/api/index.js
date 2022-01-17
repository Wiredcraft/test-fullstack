import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8000'})
API.interceptors.response.use(
    response => {
        return response.data.result;
    },
    error => {
        // TODO 个性化处理异常，抛出去自定义异常
        return Promise.reject(error)
    },
);

export const signUp =(data)=> API.post('/users/signup', data)
export const signIn =(data)=> API.post('/users/signin', data)
export const createPost = (data) => API.post('/posts', data)
export const getPostList = (query)=> API.get('/posts', query)
export const getPost = (id)=> API.get(`/posts/${id}`)
export const removePost = (id)=> API.delete(`/posts/${id}`)
