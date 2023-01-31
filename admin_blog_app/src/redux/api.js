import axios from 'axios';

const API = axios.create({baseURL: "http://localhost:5000"});

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).accessToken}`;
    }
    return req;
})

export const login = (formValue) => API.post("/admin/login", formValue);
export const browerArticle = (id_article, action) => API.patch(`admin/broweringPost/${id_article}/${action}`);
export const getUsers = () => API.get("/auth");
export const changeAndBan = (formValue) => API.patch("/admin/changeRole", formValue);
export const restoreArticles = (formValue) => API.patch("/admin/restore", formValue);


export const getPosts = () => API.get(`/post`);
export const getPost = (id) => API.get(`/post/${id}`);