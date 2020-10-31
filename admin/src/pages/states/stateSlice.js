import { createSlice } from '@reduxjs/toolkit';
import { findWithAttr } from "helpers/utils";

// Require mock data if our env var is set to true
let mockStateData;
if (process.env.REACT_APP_LOCAL_STATES) {
    mockStateData = require('../../mock/state_mock.json');
}

export const stateSlice = createSlice({
    name: 'states',
    initialState: {
        loading: true,
        loaded: false,
        data: []
    },
    reducers: {
        setData: (state, action) => {
            state.loading = false;
            state.loaded = true;

            // Sort by state name
            const sortedStates = action.payload.sort((a, b) => a.name.localeCompare(b.name));
            state.data = sortedStates;
        },
        saveData: (state, action) => {
            const index = findWithAttr(state.data, 'id', action.payload.id);

            // TODO: Perform PATCH to update server data. Right now, we'll just update our local state
            if (action.payload.id === null) {
                console.log(`Creating New State: `, action.payload);
            } else {
                console.log(`Updating State (#${action.payload.id}: `, action.payload);
            }

            state.data[index] = action.payload;
        }
    }
});

export const { saveData, setData } = stateSlice.actions;

export const getData = () => dispatch => {
    if (process.env.REACT_APP_LOCAL_STATES) {
        dispatch(setData(mockStateData));
    }

    // TODO: Fetch from a back end here
}

export const selectStates = state => {
    return state.states;
}
export const selectState = id => state => {
    if (state.states.loaded === false) {
        return {};
    }

    return state.states.data.filter((state) => state.id === parseInt(id))[0];
}

export default stateSlice.reducer;