import { createSlice } from '@reduxjs/toolkit';
import { findWithAttr } from "helpers/utils";

// Require mock data if our env var is set to true
let mockStateData;
if (process.env.REACT_APP_LOCAL_DATA) {
    mockStateData = require('mock/state_mock.json');
}

export const stateSlice = createSlice({
    name: 'states',
    initialState: {
        loading: true,
        loaded: false,
        data: []
    },
    reducers: {
        setStateData: (state, action) => {
            state.loading = false;
            state.loaded = true;

            // Sort by state name
            const sortedStates = action.payload.sort((a, b) => a.name.localeCompare(b.name));
            state.data = sortedStates;
        },
        saveStateData: (state, action) => {
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

export const { saveStateData, setStateData } = stateSlice.actions;

export const getStateData = () => dispatch => {
    if (process.env.REACT_APP_LOCAL_DATA) {
        dispatch(setStateData(mockStateData));
    }

    // TODO: Fetch from a back end here
}

export const selectStates = state => {
    return state.states;
}

export const selectState = abbrev => state => {
    if (state.states.loaded === false) {
        return {};
    }

    return state.states.data.filter((state) => state.abbrev === abbrev)[0];
}

export default stateSlice.reducer;