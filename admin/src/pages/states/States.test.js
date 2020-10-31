import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import States from './States';

const mockStore = configureStore([]);

describe('States Component', () => {
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
                <States />
            </Provider>
        );
    });

    it('should match snapshot', () => {
        expect(component.toJSON()).toMatchSnapshot();
    })
})
