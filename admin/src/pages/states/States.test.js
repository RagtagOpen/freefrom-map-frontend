import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import States from './States';

let mockState = require('mock/store_mock.json');
const mockStore = configureStore([]);

describe('States Component', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore(mockState);

        component = renderer.create(
            <Provider store={ store }>
                <States />
            </Provider>
        );
    });

    it('should match snapshot', () => {
        expect(component.toJSON()).toMatchSnapshot();
    })
})
