import { createSlice } from '@reduxjs/toolkit';
import { findWithAttr } from "helpers/utils";

// Require mock data if our env var is set to true
let mockCategoryData;
if (process.env.REACT_APP_LOCAL_CATEGORIES) {
    mockCategoryData = require('../../mock/category_mock.json');
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
        },
        saveData: (state, action) => {
            const index = findWithAttr(state.data, 'id', action.payload.id);

            // TODO: Perform PATCH to update server data. Right now, we'll just update our local state
            if (action.payload.id === null) {
                console.log(`Creating New Category: `, action.payload);
            } else {
                console.log(`Updating Category (#${action.payload.id}: `, action.payload);
            }

            state.data[index] = action.payload;
        }
    }
});

export const { saveData, setData } = categorySlice.actions;

export const getData = () => dispatch => {
    if (process.env.REACT_APP_LOCAL_CATEGORIES) {
        dispatch(setData(mockCategoryData));
    }

    // TODO: Fetch from a back end here
}

export const selectCategories = state => {
    return state.categories;
}
export const selectCategory = id => state => {
    if (state.categories.loaded === false) {
        return {};
    }

    return state.categories.data.filter((category) => category.id === parseInt(id))[0];
}

export default categorySlice.reducer;