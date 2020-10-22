import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import CategoryEdit from './CategoryEdit';

const mockStore = configureStore([]);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 1
    }),
    useLocation: () => ({
        pathname: "/categories/1/edit"
    }),
    useRouteMatch: () => ({ url: '/categories/1/edit' }),
}));

describe('CategoryEdit Component', () => {
    let store;
    let component;

    beforeEach(() => {

        store = mockStore({
            categories: {
                loading: false,
                loaded: true,
                data: [
                    {
                        "id": 1,
                        "name": "Test Name",
                        "items": [
                            {
                                "id": 1,
                                "name": "Test Item",
                                "active": true
                            }
                        ],
                        "active": true,
                    }
                ]
            }
        });

        component = renderer.create(
            <Provider store={ store }>
                <CategoryEdit />
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
                pathname: "/categories/new"
            }),
            useRouteMatch: () => ({ url: '/categories/1/edit' }),
        }));

        expect(component.toJSON()).toMatchSnapshot();
    })
})
