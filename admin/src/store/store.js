import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from 'store/categorySlice'
import stateReducer from 'store/stateSlice'

export default configureStore({
    reducer: {
        categories: categoryReducer,
        states: stateReducer
    },
});
