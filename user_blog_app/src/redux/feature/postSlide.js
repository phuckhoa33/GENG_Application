import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from '../api';


export const getPosts = createAsyncThunk(
    "/post/getPosts",
    async(_, {rejectWithValue}) => 
    {
        try {
            const response = await api.getPosts();
            console.log(response);
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.message);
        }
    }
)

export const getPostsSlice = createAsyncThunk(
    "/post/getPostsSlice",
    async(_, {rejectWithValue}) => 
    {
        try {
            const response = await api.getPostsSlice();
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.message);
        }
    }
)

export const getRelatedAdd = createAsyncThunk(
    "/post/getRelatedAdd",
    async(_, {rejectWithValue}) => 
    {
        try {
            const response = await api.getRelatedAdd();
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.message);
        }
    }
)

export const getPost = createAsyncThunk(
    "/post/getPost",
    async(id, {rejectWithValue}) => 
    {
        try {
            const response = await api.getPost(id);
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.message);
        }
    }
)

export const getPostsByUser = createAsyncThunk(
    "/post/getPostsByUser",
    async(id, {rejectWithValue}) => 
    {
        try {
            const response = await api.getPostsByUser(id);
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.message);
        }
    }
)

export const createPost = createAsyncThunk(
    "/post/createPost",
    async({updatedPostData, navigate, toast}, {rejectWithValue}) => 
    {
        try {
            const response = await api.createPost(updatedPostData);
            toast.success("Post Added Successfully");
            navigate('/');
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.message);
        }
    }
)


export const updatedViewPost = createAsyncThunk(
    "/post/updatedViewPost",
    async({id, name}, {rejectWithValue}) => 
    {
        try {
            const response = await api.updatedViewPost(id, name);
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.message);
        }
    }
)

export const updatedCommentPost = createAsyncThunk(
    "/post/updatedCommentPost",
    async({id, name}, {rejectWithValue}) => 
    {
        try {
            const response = await api.updatedCommentPost(id, name);
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.message);
        }
    }
)

export const updateAccount = createAsyncThunk(
    "/post/updateAccount",
    async({id, name}, {rejectWithValue}) => 
    {
        try {
            const response = await api.updateAccount(id, name);
            console.log("he "+response);
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.message);
        }
    }
)

export const getPostsByTag = createAsyncThunk(
    "/post/getPostsByTag",
    async(tag, {rejectWithValue}) =>
    {
        try {
            const response = await api.getPostsByTag(tag);
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.message);
        }
    }
)

export const deletePost = createAsyncThunk(
    "/post/deletePost",
    async({id, toast}, {rejectWithValue}) => 
    {
        try {
            const response = await api.deletePost(id);
            toast.success("Post id deleted successfully");
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.message);
        }
    }
)

export const updatePost = createAsyncThunk(
    "/post/updatePost", 
    async({id, updatedPostData, toast, navigate}, {rejectWithValue}) => 
    {
        try {
            const response = await api.updatePost(id, updatedPostData);
            navigate("/dashboard");
            toast.success("Update Post is successfully");
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.message);
        }
    }
)

export const getSearchPosts = createAsyncThunk(
    "/post/getSearchPosts", 
    async(searchQuery, {rejectWithValue}) => 
    {
        try {
            const response = await api.getSearchPosts(searchQuery);
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.message);
        }
    }
)

export const getTop5Posts = createAsyncThunk(
    '/post/getTop5Posts',
    async(_, {rejectWithValue}) => {
        try {
            const response = await api.getTop5Posts();;
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.message);
        }
    }
)

const postSlice = createSlice({
    name: "post",
    initialState: {
        post: {},
        posts: [],
        top5: [],
        slice: [],
        relatedAdd: [],
        userPosts: [],
        tagPosts: [],
        relatedPosts: [],
        error: "",
        loading: false,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        clearUserPosts: (state, action) => {
            state.userPosts = [];
        }
    },
    extraReducers: {
        [createPost.pending]: (state, action) => {
            state.loading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts =  action.payload.posts;
        },
        [createPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getPosts.pending]: (state, action) => {
            state.loading = true;
        },
        [getPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts =  action?.payload?.result;
        },
        [getPosts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getPostsSlice.pending]: (state, action) => {
            state.loading = true;
        },
        [getPostsSlice.fulfilled]: (state, action) => {
            state.loading = false;
            state.slice =  action.payload.posts;
        },
        [getPostsSlice.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getRelatedAdd.pending]: (state, action) => {
            state.loading = true;
        },
        [getRelatedAdd.fulfilled]: (state, action) => {
            state.loading = false;
            state.relatedAdd =  action.payload.posts;
        },
        [getRelatedAdd.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getPost.pending]: (state, action) => {
            state.loading = true;
        },
        [getPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post =  {...action.payload.post};
        },
        [getPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getPostsByUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getPostsByUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userPosts =  action.payload.posts;    
        },
        [getPostsByUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updatedViewPost.pending]: (state, action) => {
            state.loading = true;
        },
        [updatedViewPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload.posts;
        },
        [updatedViewPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updatedCommentPost.pending]: (state, action) => {
            state.loading = true;
        },
        [updatedCommentPost.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [updatedCommentPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getPostsByTag.pending]: (state, action) => {
            state.loading = true;
        },
        [getPostsByTag.fulfilled]: (state, action) => {
            state.loading = false;
            state.tagPosts = action.payload.posts;
        },
        [getPostsByTag.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updateAccount.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [updateAccount.pending]: (state, action) => {
            state.loading = true;
        },
        [updateAccount.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [deletePost.pending]: (state, action) => {
            state.loading = true;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.loading = false;
            const {arg: { _id }} = action.meta;
            if (_id) {
            state.userPosts = state.userPosts.map((item) =>
                item._id === _id ? action.payload : item
            );
            }
        },
        [deletePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updatePost.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [updatePost.pending]: (state, action) => {
            state.loading = true;
        },
        [updatePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getSearchPosts.pending]: (state, action) => {
            state.loading = true;
        },
        [getSearchPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.userPosts = action.payload.posts;
        },
        [getSearchPosts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getTop5Posts.pending]: (state, action) => {
            state.loading = true;
        },
        [getTop5Posts.fulfilled]: (state, action) => {
            state.loading = false;
            state.top5 = action.payload.posts;
        },
        [getTop5Posts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        }
    }
})


export default postSlice.reducer;
export const {setCurrentPage, clearUserPosts} = postSlice.actions;