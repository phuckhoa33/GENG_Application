import axios from 'axios';

const API = axios.create({baseURL: "http://localhost:5000"});

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).accessToken}`;
    }
    return req;
})

export const login = (formValue) => API.post("auth/login", formValue);
export const register = (formValue)  => API.post("/auth/register", formValue);
export const updateAvatar = (id, formValue) => API.patch(`/auth/${id}`, formValue);
export const following = (id, state) => API.patch(`/auth/following/${id}/${state}`);
export const getUsers = () => API.get("/auth");
export const sendEmail = (receivedEmail) => API.post(`/auth/sendEmail/${receivedEmail}`)
export const changePassword = (formValue) => API.patch(`/auth/changePassword`, formValue);

export const getPosts = () => API.get(`/post`);
export const createPost = (postData) => API.post("/post", postData);
export const getPostsSlice = () => API.get("/post/slice");
export const getRelatedAdd = () => API.get("/post/relatedAdd");
export const getPost = (id) => API.get(`/post/${id}`);
export const getPostsByUser = (id) => API.get(`/post/userPosts/${id}`);
export const updatedViewPost = (id, name) => API.patch(`/post/views/${id}?name=${name}`);
export const updatedCommentPost = (id, name) => API.patch(`/post/comment/${id}?name=${name}`);
export const getPostsByTag = (tag) => API.get(`/post/tag/${tag}`);
export const updateAccount = (id, name) => API.patch(`/post/avatar/${id}?name=${name}`);
export const deletePost = (id) => API.delete(`/post/${id}`);
export const updatePost = (id, formValue) => API.patch(`/post/${id}`, formValue);
export const getSearchPosts = (searchQuery) => API.get(`/post/search?searchQuery=${searchQuery}`);
export const getTop5Posts = () => API.get('/post/top5');

export const createComment = (id, name, formValue) => API.post(`/comment/${id}?name=${name}`, formValue);
export const getComments = (id, page) => API.get(`/comment/${id}/${page}`);