import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Home from '@/views/Home';
import ErrorBoundary from '@/components/ErrorBoundary';
import store from '@/store';

describe('Error boundary', () => {
  it('should render error', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<ErrorBoundary spy={spy}><Home store={store} /></ErrorBoundary>);
    const error = new Error('Oops!');
    wrapper.find(Home).simulateError(error);

    expect(wrapper.state()).to.have.property('hasError', true);
    expect(wrapper.contains(<h1>Something went wrong...</h1>)).to.equal(true);
  });
});
