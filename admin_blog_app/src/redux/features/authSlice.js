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

export const changeAndBan = createAsyncThunk(
    "/auth/changeAndBan", 
    async({formValue, navigate, toast}, {rejectWithValue}) => 
    {
        try {
            const response = await api.changeAndBan(formValue);
            toast.success("Change or ban is successfully");
            navigate("/user");
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

const authSlice = createSlice({
    name: "auth",
    initialState: {
        admin: null,
        loading: false,
        error: "",
        users: [],
        success: ""
    },
    reducers: {
        setLogout: (state, payload) => {
            localStorage.clear();
            state.admin = null;
        },
        setUser: (state, action) => {
            state.admin = action.payload;
        },
    },
    extraReducers:{
        [login.pending]: (state, action) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            localStorage.setItem('profile', JSON.stringify({...action.payload}));
            state.admin = action.payload;
        },
        [login.rejected]: (state, action) => {
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
        [changeAndBan.pending]: (state, action) => {
            state.loading = true;
        },
        [changeAndBan.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = action.payload.message;
        },
        [changeAndBan.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
})

export const {setLogout, setUser} = authSlice.actions;
export default authSlice.reducer;