import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../pages/categories/categorySlice'

export default configureStore({
    reducer: {
        categories: categoryReducer
    },
});
