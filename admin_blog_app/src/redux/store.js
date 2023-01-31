import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/authSlice';
import articleReducer from './features/articleSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        article: articleReducer
    }
})