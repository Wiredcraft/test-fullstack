import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Header from '../components/Header';

describe('components', () => {

    describe('Header component', () => {
        function setup() {
            const props = {
                logoText: 'Lighting Talk',
                status: 'Sign In',
                onBackToIndex: expect.createSpy(),
                onRedirect: expect.createSpy()
            };

            const renderer = TestUtils.createRenderer();
            renderer.render(
                <Header {...props} />
            );
            const output = renderer.getRenderOutput();
            return {
                props,
                output,
                renderer
            };
        }

        it('should render correctly', () => {
            const { output } = setup();
            expect(output.type).toBe('div');
        })
    });
})