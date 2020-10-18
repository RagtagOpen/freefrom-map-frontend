import { createSlice } from '@reduxjs/toolkit';

// Require mock data if our env var is set to true
let mockCategoryData;
if (process.env.REACT_APP_LOCAL_CATEGORIES) {
    mockCategoryData = require('../../mock/category_mock.json');
    console.log(mockCategoryData);
}

export const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        loading: true,
        loaded: false,
        data: []
    },
    reducers: {
        setData: (state, action) => {
            state.loading = false;
            state.loaded = true;
            state.data = action.payload;
        }
    }
});

export const { setData } = categorySlice.actions;

export const getData = () => dispatch => {
    if (process.env.REACT_APP_LOCAL_CATEGORIES) {
        dispatch(setData(mockCategoryData));
    }

    // TODO: Fetch from a back end here
}

export const selectCategories = state => state.categories;

export default categorySlice.reducer;