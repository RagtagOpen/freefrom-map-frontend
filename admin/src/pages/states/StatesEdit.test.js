import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import StateEdit from './StateEdit';

const mockStore = configureStore([]);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 1
    }),
    useLocation: () => ({
        pathname: "/states/1/edit"
    }),
    useRouteMatch: () => ({ url: '/states/1/edit' }),
}));

describe('StateEdit Component', () => {
    let store;
    let component;

    beforeEach(() => {

        store = mockStore({
            states: {
                loading: false,
                loaded: true,
                data: [
                    {
                        "id": 1,
                        "name": "State Name",
                        "abbrev": "SN",
                        "grade": 0
                    }
                ]
            }
        });

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
