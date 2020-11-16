import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import StateView from './StateView';

let mockState = require('mock/store_mock.json');
const mockStore = configureStore([]);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        abbrev: 'SN'
    }),
    useRouteMatch: () => ({ url: '/states/SN' }),
}));

describe('StateView Component', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore(mockState);

        component = renderer.create(
            <Provider store={ store }>
                <StateView />
            </Provider>
        );
    });


    it('should match snapshot', () => {
        expect(component.toJSON()).toMatchSnapshot();
    })
})
