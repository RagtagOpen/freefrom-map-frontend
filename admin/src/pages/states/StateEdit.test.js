import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import StateEdit from './StateEdit';

let mockState = require('mock/store_mock.json');
const mockStore = configureStore([]);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        abbrev: 'SN'
    }),
    useLocation: () => ({
        pathname: "/states/SN/edit"
    }),
    useRouteMatch: () => ({ url: '/states/SN/edit' }),
}));

describe('StateEdit Component', () => {
    let store;
    let component;

    beforeEach(() => {

        store = mockStore(mockState);

        component = renderer.create(
            <Provider store={ store }>
                <StateEdit />
            </Provider>
        );
    });

    it('should match edit view snapshot', () => {
        expect(component.toJSON()).toMatchSnapshot();
    })

    it('should match create new snapshot', () => {
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useParams: () => ({}),
            useLocation: () => ({
                pathname: "/states/new"
            }),
            useRouteMatch: () => ({ url: '/states/1/edit' }),
        }));

        expect(component.toJSON()).toMatchSnapshot();
    })
})
