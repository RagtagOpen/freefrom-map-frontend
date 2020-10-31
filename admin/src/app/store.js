import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../pages/categories/categorySlice'
import stateReducer from '../pages/states/stateSlice'

export default configureStore({
    reducer: {
        categories: categoryReducer,
        states: stateReducer
    },
});
