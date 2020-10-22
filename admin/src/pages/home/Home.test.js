import React from 'react';
import renderer from 'react-test-renderer';

import Home from './Home';

it('matches snapshot', () => {
    const home = renderer
        .create(<Home />)
        .toJSON();

    expect(home).toMatchSnapshot();
})
