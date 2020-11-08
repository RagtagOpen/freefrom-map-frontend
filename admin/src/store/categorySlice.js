import { createSlice } from '@reduxjs/toolkit';
import { findWithAttr } from "helpers/utils";

// Require mock data if our env var is set to true
let mockCategoryData;
if (process.env.REACT_APP_LOCAL_DATA) {
    mockCategoryData = require('mock/category_mock.json');
}

export const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        loading: true,
        loaded: false,
        data: []
    },
    reducers: {
        setCategoryData: (state, action) => {
            state.loading = false;
            state.loaded = true;
            state.data = action.payload;
        },
        saveCategoryData: (state, action) => {
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

export const { saveCategoryData, setCategoryData } = categorySlice.actions;

export const getCategoryData = () => dispatch => {
    if (process.env.REACT_APP_LOCAL_DATA) {
        dispatch(setCategoryData(mockCategoryData));
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

export const selectCategoryByItemId = id => state => {
    const category = state.data.filter((category) => {
        const categoryItem = category.items.filter((item) => item.id === id);

        if (categoryItem.length > 0) {
            return true;
        }

        return false
    });

    if (category.length > 0) {
        return category;
    }

    return null;
}

export default categorySlice.reducer;