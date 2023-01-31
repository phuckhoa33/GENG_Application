import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from '../api';

export const login = createAsyncThunk(
    "/auth/login", 
    async({formValue, navigate, toast}, {rejectWithValue}) => 
    {
        try {
            const response = await api.login(formValue);
            toast.success("Login is successfully");
            navigate("/");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const register = createAsyncThunk(
    "/auth/register",
    async({formValue, navigate, toast}, {rejectWithValue}) => 
    {
        try {
            const response = await api.register(formValue);
            toast.success("Register is successfully");
            navigate("/");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const getUsers = createAsyncThunk(
    "/auth/getUsers",
    async(_, {rejectWithValue}) => 
    {
        try {
            const response = await api.getUsers();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const updateAvatar = createAsyncThunk(
    "/auth/updateAvatar",
    async({id, formValues}, {rejectWithValue}) => 
    {
        try {
            const response = await api.updateAvatar(id, formValues);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const following = createAsyncThunk(
    "/auth/following",
    async({id, state}, {rejectWithValue}) => 
    {
        try {
            const response = await api.following(id, state);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const sendEmail = createAsyncThunk(
    "/auth/sendEmail",
    async({receivedEmail}, {rejectWithValue}) => 
    {
        try {
            const response = await api.sendEmail(receivedEmail);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const changePassword = createAsyncThunk(
    "/auth/changePassword",
    async({formValue, toast, navigate}, {rejectWithValue}) => 
    {
        try {
            console.log(formValue);
            const response = await api.changePassword(formValue);
            toast.success("You have changed your password successfully");
            navigate("/login");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        users: [],
        user: null,
        userProfile: null,
        error: "",
        loading: false,
        visisted: "",
        code: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserProfile: (state, action) => {
            state.userProfile = action.payload;
        },
        setState: (state, action) => {
            state.visisted = action.payload;
        },
        setLogout: (state, payload) => {
            localStorage.clear();
            state.user = null;
        },
        clearUsers: (state, payload) => {
            state.users = null;
        },
        resetCode: (state, payload) => {
            state.code = null;
        }
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem('profile', JSON.stringify({...action.payload}));
            state.user = action.payload;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [register.pending]: (state, action) => {
            state.loading = true;
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem('profile', JSON.stringify({...action.payload}));
            state.user = action.payload;
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getUsers.pending]: (state, action) => {
            state.loading = true;
        },
        [getUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload.users;
        },
        [getUsers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updateAvatar.pending]: (state, action) => {
            state.loading = true;
        },
        [updateAvatar.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [updateAvatar.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [following.pending]: (state, action) => {
            state.loading = true;
        },
        [following.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload.users;
        },
        [following.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [sendEmail.pending]: (state, action) => {
            state.loading = true;
        },
        [sendEmail.fulfilled]: (state, action) => {
            state.loading = false;
            state.code = action.payload;
        },
        [sendEmail.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [changePassword.pending]: (state, action) => {
            state.loading = true;
        },
        [changePassword.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = action.payload.message;
        },
        [changePassword.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        }
    }
})


export const {setUser, setState, setLogout, clearUsers, setUserProfile} = authSlice.actions;

export default authSlice.reducer;