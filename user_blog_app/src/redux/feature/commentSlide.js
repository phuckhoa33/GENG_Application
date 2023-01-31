import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as api from '../api';

export const createComment = createAsyncThunk(
    "/comment/createComment",
    async({id, name, formValue}, {rejectWithValue}) => 
    {
        try {
            const response = await api.createComment(id, name, formValue);
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }
)

export const getComments = createAsyncThunk(
    "/comment/getComments",
    async({id, page}, {rejectWithValue}) => 
    {
        try {
            const response = await api.getComments(id, page);
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }
)

const commentSlide = createSlice({
    name: "comment",
    initialState: {
        comment: [],
        loading: false,
        error: "",
        amount: 0
    },
    reducers: {
        clearComment: (state, action) => {
            state.comment = [];
        }
    },
    extraReducers: {
        [createComment.pending]: (state, action) => {
            state.loading = true;
        },
        [createComment.fulfilled]: (state, action) => {
            state.loading = false;
            state.comment = action.payload.comment.comments;
            state.amount = action.payload.comment.pages;
        },
        [createComment.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getComments.pending]: (state, action) => {
            state.loading = true;
        },
        [getComments.fulfilled]: (state, action) => {
            state.loading = false;
            state.comment = action.payload.comment.comments;
            state.amount = action.payload.comment.pages;
        },
        [getComments.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        }
    }
});

export const {clearComment} = commentSlide.actions;
export default commentSlide.reducer;