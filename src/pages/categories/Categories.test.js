import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Categories from './Categories';

const mockStore = configureStore([]);

describe('Categories Component', () => {
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
                            {"name": "Test Item"}
                        ],
                        "active": true,
                    }
                ]
            }
        });

        component = renderer.create(
            <Provider store={ store }>
                <Categories />
            </Provider>
        );
    });

    it('should match snapshot', () => {
        expect(component.toJSON()).toMatchSnapshot();
    })
})
