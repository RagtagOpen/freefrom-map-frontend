import React from 'react';
import renderer from 'react-test-renderer';

import StateGrade from './StateGrade';

describe('State Grade Component', () => {
    let component;

    beforeEach(() => {
        component = renderer.create(<StateGrade grade={0} />);
    });

    it('should match snapshot', () => {
        expect(component.toJSON()).toMatchSnapshot();
    })
})
