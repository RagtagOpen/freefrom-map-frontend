import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import CategoryView from './CategoryView';

const mockStore = configureStore([]);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 1
    }),
    useRouteMatch: () => ({ url: '/categories/1' }),
}));

describe('CategoryView Component', () => {
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
                <CategoryView />
            </Provider>
        );
    });


    it('should match snapshot', () => {
        expect(component.toJSON()).toMatchSnapshot();
    })
})
