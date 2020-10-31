import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import StateView from './StateView';

const mockStore = configureStore([]);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 1
    }),
    useRouteMatch: () => ({ url: '/states/1' }),
}));

describe('StateView Component', () => {
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
                <StateView />
            </Provider>
        );
    });


    it('should match snapshot', () => {
        expect(component.toJSON()).toMatchSnapshot();
    })
})
