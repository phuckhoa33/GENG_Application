import {configureStore} from '@reduxjs/toolkit';

import authReducer from './feature/authSlide';
import postReducer from './feature/postSlide';
import commentReducer from './feature/commentSlide';

export default configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        comment: commentReducer
    }
})