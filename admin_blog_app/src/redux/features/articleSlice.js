import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from '../api';

export const getPosts = createAsyncThunk(
    "/post/getPosts",
    async(_, {rejectWithValue}) => 
    {
        try {
            const response = await api.getPosts();
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

export const browerArticle = createAsyncThunk(
    "/post/browerArticle",
    async({id_article, action}, {rejectWithValue}) => 
    {
        try {
            const response = await api.browerArticle(id_article, action);
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.message);
        }
    }
)

export const restoreArticles = createAsyncThunk(
    "/post/restoreArticles",
    async({formValue}, {rejectWithValue}) => 
    {
        try {
            console.log(formValue);
            const response = await api.restoreArticles(formValue);
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
        waitedPosts: [],
        error: "",
        loading: false,
        success: "",
        deletedPosts: []
    },
    reducers: {
        addProduct: (state, action) => {
            state.waitedPosts.push(action.payload);
        },
        removeProduct: (state, action) => {
            state.waitedPosts = state.waitedPosts.filter(post => post._id !== action.payload);
        }
    },
    extraReducers: {
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
        [browerArticle.pending]: (state, action) => {
            state.loading = true;
        },
        [browerArticle.fulfilled]: (state, action) => {
            state.loading = false;        
            state.success = action.payload.message;
        },
        [browerArticle.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [restoreArticles.pending]: (state, action) => {
            state.loading = true;
        },
        [restoreArticles.fulfilled]: (state, action) => {
            state.loading = false;        
            state.success = action.payload.message;
        },
        [restoreArticles.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
})

export default postSlice.reducer;
export const {addProduct, removeProduct} = postSlice.actions;